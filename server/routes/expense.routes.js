import express from "express";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  getExpensesByTrip,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/", createExpense);
router.get("/", getAllExpenses);
router.get("/trip/:tripId", getExpensesByTrip);
router.get("/trip/:tripId/summary", getExpenseSummary);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
