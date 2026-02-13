import { Trip } from "../models/trip.model.js";
import { User } from "../models/user.model.js";
import { sendTripInvitation } from "../services/email.service.js";

// Create Trip
export const createTrip = async (req, res) => {
  try {
    const { trip_name, trip_start_date, trip_end_date, category, members_id, trip_cover_image } = req.body;

    // Validate members exist
    if (members_id && members_id.length > 0) {
      const members = await User.find({ _id: { $in: members_id } });
      if (members.length !== members_id.length) {
        return res.status(400).json({ success: false, message: "Some members not found" });
      }
    }

    const trip = new Trip({
      trip_name,
      trip_start_date,
      trip_end_date,
      category,
      members_id: members_id || [],
      trip_cover_image,
    });

    await trip.save();
    
    // Populate members for response
    await trip.populate("members_id", "user_full_name email");
    
    // Send invitation emails to all members (except creator if they're in the list)
    const tripCreator = req.user?._id || members_id[0]; // Assuming first member is creator
    const membersToNotify = trip.members_id.filter(m => m._id.toString() !== tripCreator.toString());
    
    for (const member of membersToNotify) {
      if (member.email) {
        await sendTripInvitation(
          member.email,
          trip.trip_name,
          `${new Date(trip.trip_start_date).toLocaleDateString()} - ${new Date(trip.trip_end_date).toLocaleDateString()}`,
          req.user?.user_full_name || "Trip Admin",
          trip._id.toString()
        );
      }
    }
    
    res.status(201).json({ success: true, data: trip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Trips
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("members_id", "user_full_name email").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: trips.length, data: trips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate("members_id", "user_full_name email user_id");
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Trip
export const updateTrip = async (req, res) => {
  try {
    const { trip_name, trip_start_date, trip_end_date, category, members_id, trip_cover_image } = req.body;

    // Validate members if provided
    if (members_id && members_id.length > 0) {
      const members = await User.find({ _id: { $in: members_id } });
      if (members.length !== members_id.length) {
        return res.status(400).json({ success: false, message: "Some members not found" });
      }
    }

    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      {
        trip_name,
        trip_start_date,
        trip_end_date,
        category,
        members_id,
        trip_cover_image,
      },
      { new: true, runValidators: true }
    ).populate("members_id", "user_full_name email");

    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Trip
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }
    res.status(200).json({ success: true, message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Member to Trip
export const addMemberToTrip = async (req, res) => {
  try {
    const { user_id } = req.body;
    
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    if (trip.members_id.includes(user_id)) {
      return res.status(400).json({ success: false, message: "User already in trip" });
    }

    trip.members_id.push(user_id);
    await trip.save();
    
    await trip.populate("members_id", "user_full_name email");
    
    // Send invitation email to the new member
    if (user.email) {
      const inviter = await User.findById(req.user?._id || trip.members_id[0]);
      await sendTripInvitation(
        user.email,
        trip.trip_name,
        `${new Date(trip.trip_start_date).toLocaleDateString()} - ${new Date(trip.trip_end_date).toLocaleDateString()}`,
        inviter?.user_full_name || "Trip Admin",
        trip._id.toString()
      );
    }
    
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Remove Member from Trip
export const removeMemberFromTrip = async (req, res) => {
  try {
    const { user_id } = req.body;
    
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    trip.members_id = trip.members_id.filter(id => id.toString() !== user_id);
    await trip.save();
    
    await trip.populate("members_id", "user_full_name email");
    
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
