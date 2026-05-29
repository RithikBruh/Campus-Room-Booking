import express from 'express'
import { BookRoom, getUserBookings, removeBooking} from '../controllers/bookings.controller.js'

const router = express.Router()

// ---------------------- ANY USER --------------

// Create a new booking
// body: { venueId, date, startTime, endTime, reason }
router.post('/bookings', BookRoom)

// Get bookings for the authenticated user
router.get('/bookings', getUserBookings)

// Delete a booking
router.delete('/bookings/:id', removeBooking)

// --------------------------------------

export default router
