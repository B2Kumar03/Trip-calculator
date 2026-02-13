import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./db/index.js";
import { setupChatSocket } from "./socket/chat.socket.js";
import { checkDbConnection } from "./middleware/dbCheck.js";

// Import routes
import userRoutes from "./routes/user.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import settlementRoutes from "./routes/settlement.routes.js";
import chatRoutes from "./routes/chat.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.io with CORS
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Change this to your frontend URL in production
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection - wait for it to be ready
dbConnection().then(() => {
  console.log("📡 Ready to accept API requests");
}).catch((err) => {
  console.error("⚠️ Database connection failed, but server will continue:", err.message);
});

// Setup Socket.io for chat
setupChatSocket(io);

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Trip Calculator API Server is running",
    endpoints: {
      users: "/api/users",
      trips: "/api/trips",
      expenses: "/api/expenses",
      settlements: "/api/settlements",
      chat: "/api/chat",
    },
  });
});

app.use("/api/users", checkDbConnection, userRoutes);
app.use("/api/trips", checkDbConnection, tripRoutes);
app.use("/api/expenses", checkDbConnection, expenseRoutes);
app.use("/api/settlements", checkDbConnection, settlementRoutes);
app.use("/api/chat", checkDbConnection, chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.io server ready for connections`);
});

export { io };
