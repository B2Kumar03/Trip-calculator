import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
      tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
      },
  
      messages: [
        {
          sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
  
          name: String,
  
          text: String,
  
          file: String,
        },
      ],
    },
    { timestamps: true }
  );
  
  export const Chat = mongoose.model("Chat", chatSchema);
  