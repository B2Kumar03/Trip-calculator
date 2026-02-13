import express from "express";
import {
  calculateSettlement,
  getSettlementByTrip,
  updateSettlementStatus,
  getAllSettlements,
} from "../controllers/settlement.controller.js";

const router = express.Router();

router.post("/trip/:tripId/calculate", calculateSettlement);
router.get("/trip/:tripId", getSettlementByTrip);
router.put("/trip/:tripId/status", updateSettlementStatus);
router.get("/", getAllSettlements);

export default router;
