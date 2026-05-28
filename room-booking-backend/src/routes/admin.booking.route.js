import express from "express";
import {getBookingRequests,updateBookingRequest} from "../controllers/bookings.controller.js";

const router = express.Router();
// ---------------------- ADMIN USER --------------

// Update booking status (admin only)
// body: {id ,  status: "pending" | "approved" | "rejected" }
router.put("/booking-requests/:id", updateBookingRequest);

router.get("/booking-requests", getBookingRequests);

export default router;
