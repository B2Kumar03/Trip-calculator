import mongoose from "mongoose";

// Middleware to check if database is connected
export const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "Database connection not ready. Please try again in a moment.",
      readyState: mongoose.connection.readyState,
    });
  }
  next();
};
