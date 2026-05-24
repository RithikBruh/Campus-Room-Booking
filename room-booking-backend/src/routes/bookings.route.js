import express from 'express'
import { BookRoom, getUserBookings, removeBooking ,getBookingRequests,updateBookingRequest} from '../controllers/bookings.controller.js'

const router = express.Router()

// ---------------------- ANY USER --------------

// Create a new booking
// body: { venueId, date, timing, reason }
router.post('/bookings', BookRoom)

// Get bookings for the authenticated user
router.get('/bookings', getUserBookings)

// Delete a booking
router.delete('/bookings/:id', removeBooking)

// ---------------------- ADMIN USER --------------

// Update booking status (admin only)
// body: {id ,  status: "pending" | "approved" | "rejected" }
router.put('/booking-requests/:id', updateBookingRequest)

router.get('/booking-requests', getBookingRequests)

// --------------------------------------

export default router
