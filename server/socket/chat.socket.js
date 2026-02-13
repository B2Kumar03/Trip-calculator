import { Chat } from "../models/chat.model.js";
import { Trip } from "../models/trip.model.js";
import { User } from "../models/user.model.js";

export const setupChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Join trip room
    socket.on("join_trip", async (tripId) => {
      try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
          socket.emit("error", { message: "Trip not found" });
          return;
        }
        
        socket.join(`trip_${tripId}`);
        console.log(`User ${socket.id} joined trip_${tripId}`);
        
        socket.emit("joined_trip", { tripId, message: "Successfully joined trip chat" });
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    // Leave trip room
    socket.on("leave_trip", (tripId) => {
      socket.leave(`trip_${tripId}`);
      console.log(`User ${socket.id} left trip_${tripId}`);
    });

    // Send message
    socket.on("send_message", async (data) => {
      try {
        const { tripId, sender_id, name, text, file } = data;

        // Validate trip exists
        const trip = await Trip.findById(tripId);
        if (!trip) {
          socket.emit("error", { message: "Trip not found" });
          return;
        }

        // Validate user exists
        const user = await User.findById(sender_id);
        if (!user) {
          socket.emit("error", { message: "User not found" });
          return;
        }

        // Get or create chat
        let chat = await Chat.findOne({ tripId });
        if (!chat) {
          chat = new Chat({
            tripId,
            messages: [],
          });
        }

        // Add message
        const message = {
          sender_id,
          name: name || user.user_full_name,
          text: text || "",
          file: file || "",
        };

        chat.messages.push(message);
        await chat.save();

        // Populate sender info
        await chat.populate("messages.sender_id", "user_full_name email");

        // Get the last message (the one we just added)
        const lastMessage = chat.messages[chat.messages.length - 1];

        // Broadcast to all users in the trip room
        io.to(`trip_${tripId}`).emit("new_message", {
          success: true,
          message: lastMessage,
          tripId,
        });

        console.log(`Message sent in trip_${tripId} by ${user.user_full_name}`);
      } catch (error) {
        socket.emit("error", { message: error.message });
        console.error("Socket error:", error);
      }
    });

    // Typing indicator
    socket.on("typing", (data) => {
      const { tripId, userId, userName, isTyping } = data;
      socket.to(`trip_${tripId}`).emit("user_typing", {
        userId,
        userName,
        isTyping,
      });
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};
