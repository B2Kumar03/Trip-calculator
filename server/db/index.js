// db connection
import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    // Add database name to connection string
    const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://bk7355583_db_user:N0PHPrtp0RnKPftW@cluster0.bc5oyiq.mongodb.net/tripcalculator?retryWrites=true&w=majority&appName=Cluster0";
    
    // Disable buffering - fail fast if not connected
    mongoose.set('bufferCommands', false);
    
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 2, // Maintain at least 2 socket connections
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("Full error:", error);
    // Don't exit immediately - let server start and show error
    // The server will still run but API calls will fail gracefully
  }
};

export default dbConnection;