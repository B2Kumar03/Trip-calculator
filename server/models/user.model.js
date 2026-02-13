import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    user_full_name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    token: {
      type: String,
      trim: true,
    },

    trip_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },

    interestedVisitPlace: {
      type: String,
    },

    allowedNotification: [
      {
        type: String,
        enum: ["whatsapp", "push", "email"],
      },
    ],

    user_id: {
      type: String,
      default: uuidv4,
    },

    upi_id: {
      type: String,
    },

    qr_code_image: {
      type: String, // image URL
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
