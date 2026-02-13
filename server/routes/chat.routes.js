import express from "express";
import {
  getOrCreateChat,
  addMessage,
  getChatMessages,
  deleteMessage,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/trip/:tripId", getOrCreateChat);
router.get("/trip/:tripId/messages", getChatMessages);
router.post("/message", addMessage);
router.delete("/trip/:tripId/message/:messageId", deleteMessage);

export default router;
