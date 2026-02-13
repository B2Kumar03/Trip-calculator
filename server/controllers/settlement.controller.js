import { Settlement } from "../models/settlement.model.js";
import { Trip } from "../models/trip.model.js";
import { Expense } from "../models/expense.model.js";

// Calculate and Create Settlement
export const calculateSettlement = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId).populate("members_id", "user_full_name email");
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    // Get all expenses for this trip
    const expenses = await Expense.find({ trip_id: tripId });

    // Calculate who paid what and who owes what
    const balances = {};
    trip.members_id.forEach(member => {
      balances[member._id.toString()] = {
        user_id: member._id,
        name: member.user_full_name,
        paid: 0,
        owes: 0,
        net: 0,
      };
    });

    // Calculate totals
    expenses.forEach(expense => {
      const payerId = expense.paid_by_id.toString();
      if (balances[payerId]) {
        balances[payerId].paid += expense.amount;
      }

      expense.split_between.forEach(split => {
        const userId = split.user_id.toString();
        if (balances[userId]) {
          balances[userId].owes += split.amount || 0;
        }
      });
    });

    // Calculate net balances
    Object.keys(balances).forEach(userId => {
      balances[userId].net = balances[userId].paid - balances[userId].owes;
    });

    // Calculate settlements (who should pay whom)
    const settlements = [];
    const positiveBalances = [];
    const negativeBalances = [];

    Object.values(balances).forEach(balance => {
      if (balance.net > 0) {
        positiveBalances.push(balance);
      } else if (balance.net < 0) {
        negativeBalances.push(balance);
      }
    });

    // Sort: highest positive first, lowest negative first
    positiveBalances.sort((a, b) => b.net - a.net);
    negativeBalances.sort((a, b) => a.net - b.net);

    // Match up settlements
    let posIdx = 0;
    let negIdx = 0;

    while (posIdx < positiveBalances.length && negIdx < negativeBalances.length) {
      const sender = negativeBalances[negIdx];
      const receiver = positiveBalances[posIdx];

      const amount = Math.min(Math.abs(sender.net), receiver.net);

      settlements.push({
        sender: {
          name: sender.name,
          user_id: sender.user_id,
          amount: amount,
        },
        receiver: {
          name: receiver.name,
          user_id: receiver.user_id,
          amount: amount,
        },
        status: "Pending",
      });

      sender.net += amount;
      receiver.net -= amount;

      if (sender.net === 0) negIdx++;
      if (receiver.net === 0) posIdx++;
    }

    // Calculate trip cost and percent
    const tripCost = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalMembers = trip.members_id.length;
    const percent = totalMembers > 0 ? 100 / totalMembers : 0;

    // Check if settlement already exists
    let settlement = await Settlement.findOne({ trip_id: tripId });

    if (settlement) {
      settlement.settlement_amount = settlements;
      settlement.trip_cost = tripCost;
      settlement.percent = percent;
      await settlement.save();
    } else {
      settlement = new Settlement({
        trip_id: tripId,
        settlement_amount: settlements,
        trip_cost: tripCost,
        percent: percent,
      });
      await settlement.save();
    }

    await settlement.populate([
      { path: "trip_id", select: "trip_name" },
      { path: "settlement_amount.sender.user_id", select: "user_full_name email" },
      { path: "settlement_amount.receiver.user_id", select: "user_full_name email" },
    ]);

    res.status(200).json({
      success: true,
      data: {
        settlement,
        balances: Object.values(balances),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Settlement by Trip ID
export const getSettlementByTrip = async (req, res) => {
  try {
    const settlement = await Settlement.findOne({ trip_id: req.params.tripId })
      .populate("trip_id", "trip_name")
      .populate("settlement_amount.sender.user_id", "user_full_name email")
      .populate("settlement_amount.receiver.user_id", "user_full_name email");

    if (!settlement) {
      return res.status(404).json({ success: false, message: "Settlement not found for this trip" });
    }

    res.status(200).json({ success: true, data: settlement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Settlement Status
export const updateSettlementStatus = async (req, res) => {
  try {
    const { settlementIndex, status } = req.body;

    const settlement = await Settlement.findOne({ trip_id: req.params.tripId });
    if (!settlement) {
      return res.status(404).json({ success: false, message: "Settlement not found" });
    }

    if (settlementIndex >= 0 && settlementIndex < settlement.settlement_amount.length) {
      settlement.settlement_amount[settlementIndex].status = status;
      await settlement.save();

      await settlement.populate([
        { path: "trip_id", select: "trip_name" },
        { path: "settlement_amount.sender.user_id", select: "user_full_name email" },
        { path: "settlement_amount.receiver.user_id", select: "user_full_name email" },
      ]);

      res.status(200).json({ success: true, data: settlement });
    } else {
      res.status(400).json({ success: false, message: "Invalid settlement index" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Settlements
export const getAllSettlements = async (req, res) => {
  try {
    const settlements = await Settlement.find()
      .populate("trip_id", "trip_name")
      .populate("settlement_amount.sender.user_id", "user_full_name email")
      .populate("settlement_amount.receiver.user_id", "user_full_name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: settlements.length, data: settlements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
