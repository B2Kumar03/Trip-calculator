import { Expense } from "../models/expense.model.js";
import { Trip } from "../models/trip.model.js";
import { User } from "../models/user.model.js";

// Create Expense
export const createExpense = async (req, res) => {
  try {
    const { expense_title, amount, category, trip_id, paid_by_id, split_between, bill_image } = req.body;

    // Validate trip exists
    const trip = await Trip.findById(trip_id);
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    // Validate payer exists
    const payer = await User.findById(paid_by_id);
    if (!payer) {
      return res.status(404).json({ success: false, message: "Payer not found" });
    }

    // Validate split_between users exist and are in trip
    if (split_between && split_between.length > 0) {
      const userIds = split_between.map(s => s.user_id);
      const users = await User.find({ _id: { $in: userIds } });
      if (users.length !== userIds.length) {
        return res.status(400).json({ success: false, message: "Some users in split not found" });
      }

      // Check if all users are in the trip
      const tripMemberIds = trip.members_id.map(id => id.toString());
      const allInTrip = userIds.every(id => tripMemberIds.includes(id.toString()));
      if (!allInTrip) {
        return res.status(400).json({ success: false, message: "All users in split must be trip members" });
      }
    }

    const expense = new Expense({
      expense_title,
      amount,
      category,
      trip_id,
      paid_by_id,
      split_between: split_between || [],
      bill_image,
    });

    await expense.save();
    
    await expense.populate([
      { path: "trip_id", select: "trip_name" },
      { path: "paid_by_id", select: "user_full_name email" },
      { path: "split_between.user_id", select: "user_full_name email" },
    ]);

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Expenses
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("trip_id", "trip_name")
      .populate("paid_by_id", "user_full_name email")
      .populate("split_between.user_id", "user_full_name email")
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Expenses by Trip ID
export const getExpensesByTrip = async (req, res) => {
  try {
    const expenses = await Expense.find({ trip_id: req.params.tripId })
      .populate("trip_id", "trip_name")
      .populate("paid_by_id", "user_full_name email")
      .populate("split_between.user_id", "user_full_name email")
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate("trip_id", "trip_name")
      .populate("paid_by_id", "user_full_name email")
      .populate("split_between.user_id", "user_full_name email");
    
    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }
    
    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { expense_title, amount, category, split_between, bill_image } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        expense_title,
        amount,
        category,
        split_between,
        bill_image,
      },
      { new: true, runValidators: true }
    )
      .populate("trip_id", "trip_name")
      .populate("paid_by_id", "user_full_name email")
      .populate("split_between.user_id", "user_full_name email");

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }
    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Expenses Summary for a Trip
export const getExpenseSummary = async (req, res) => {
  try {
    const { tripId } = req.params;
    
    const expenses = await Expense.find({ trip_id: tripId });
    
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    // Calculate per-user totals
    const userTotals = {};
    expenses.forEach(expense => {
      expense.split_between.forEach(split => {
        const userId = split.user_id.toString();
        if (!userTotals[userId]) {
          userTotals[userId] = { user_id: userId, name: split.name, total: 0 };
        }
        userTotals[userId].total += split.amount || 0;
      });
    });

    res.status(200).json({
      success: true,
      data: {
        totalSpent,
        userTotals: Object.values(userTotals),
        expenseCount: expenses.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
