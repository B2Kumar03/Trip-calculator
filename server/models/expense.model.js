import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
      expense_title: {
        type: String,
        required: true,
        trim: true,
      },
  
      amount: {
        type: Number,
        required: true,
      },
  
      trip_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true,
      },

      category: {
        type: String,
      },
  
      paid_by_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  
      split_between: [
        {
          name: {
            type: String,
            required: true,
          },
  
          user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
  
          amount: {
            type: Number,
          },
        },
      ],
  
      bill_image: {
        type: String,
      },
    },
    { timestamps: true }
  );
  
  export const Expense = mongoose.model("Expense", expenseSchema);
  