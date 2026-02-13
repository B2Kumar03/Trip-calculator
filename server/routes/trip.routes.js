import express from "express";
import {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  addMemberToTrip,
  removeMemberFromTrip,
} from "../controllers/trip.controller.js";

const router = express.Router();

router.post("/", createTrip);
router.get("/", getAllTrips);
router.get("/:id", getTripById);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);
router.post("/:id/members", addMemberToTrip);
router.delete("/:id/members", removeMemberFromTrip);

export default router;
