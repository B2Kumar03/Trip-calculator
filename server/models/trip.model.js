import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
    {
      trip_name: {
        type: String,
        required: true,
      },
  
      trip_start_date: {
        type: Date,
        required: true,
      },
  
      trip_end_date: {
        type: Date,
        required: true,
      },
  
      category: {
        type: String,
      },
  
      members_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
  
      trip_cover_image: {
        type: String,
      },
    },
    { timestamps: true }
  );
  
  export const Trip = mongoose.model("Trip", tripSchema);
  