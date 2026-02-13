import { Chat } from "../models/chat.model.js";
import { Trip } from "../models/trip.model.js";
import { User } from "../models/user.model.js";

// Get or Create Chat for a Trip
export const getOrCreateChat = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    let chat = await Chat.findOne({ tripId });
    
    if (!chat) {
      chat = new Chat({
        tripId,
        messages: [],
      });
      await chat.save();
    }

    await chat.populate([
      { path: "tripId", select: "trip_name" },
      { path: "messages.sender_id", select: "user_full_name email" },
    ]);

    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Message to Chat (used by Socket.io, also available as REST endpoint)
export const addMessage = async (req, res) => {
  try {
    const { tripId, sender_id, name, text, file } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    const user = await User.findById(sender_id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let chat = await Chat.findOne({ tripId });
    
    if (!chat) {
      chat = new Chat({
        tripId,
        messages: [],
      });
    }

    chat.messages.push({
      sender_id,
      name: name || user.user_full_name,
      text: text || "",
      file: file || "",
    });

    await chat.save();

    await chat.populate([
      { path: "tripId", select: "trip_name" },
      { path: "messages.sender_id", select: "user_full_name email" },
    ]);

    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Chat Messages for a Trip
export const getChatMessages = async (req, res) => {
  try {
    const { tripId } = req.params;

    const chat = await Chat.findOne({ tripId })
      .populate("tripId", "trip_name")
      .populate("messages.sender_id", "user_full_name email");

    if (!chat) {
      return res.status(200).json({ success: true, data: { tripId, messages: [] } });
    }

    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Message
export const deleteMessage = async (req, res) => {
  try {
    const { tripId, messageId } = req.params;

    const chat = await Chat.findOne({ tripId });
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    chat.messages = chat.messages.filter(msg => msg._id.toString() !== messageId);
    await chat.save();

    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
