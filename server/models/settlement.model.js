import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema(
    {
      trip_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
      },
  
      settlement_amount: [
        {
          sender: {
            name: String,
            user_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            amount: Number,
          },
  
          receiver: {
            name: String,
            user_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            amount: Number,
          },
  
          status: {
            type: String,
            enum: ["Paid", "Pending"],
            default: "Pending",
          },
        },
      ],
  
      trip_cost: {
        type: Number,
      },
  
      percent: {
        type: Number,
      },
    },
    { timestamps: true }
  );
  
  export const Settlement = mongoose.model("Settlement", settlementSchema);
  