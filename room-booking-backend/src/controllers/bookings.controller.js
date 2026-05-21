import { createBooking, getBookingsByEmail, updateBookingStatus, deleteBooking } from "../models/bookings.model.js"

export async function BookRoom(req, res) {
    try {
        const { email, status, venueId, timing, reason } = req.body
        
        if (!email || !status || !venueId || !timing || !reason) {
            return res.status(400).json({ error: "Missing required fields: email, status, venueId, timing, reason" })
        }
        
        const booking = await createBooking(email, status, venueId, timing, reason)
        res.status(201).json({ message: "Booking created successfully", booking })
    } catch (error) {
        console.error('Error in BookRoom:', error)
        res.status(500).json({ error: error.message })
    }
}

// export async function getBooking(req, res) {
//     try {
//         const { id } = req.params
//         const booking = await getBookingById(id)
        
//         if (!booking) {
//             return res.status(404).json({ error: "Booking not found" })
//         }
        
//         res.status(200).json(booking)
//     } catch (error) {
//         console.error('Error in getBooking:', error)
//         res.status(500).json({ error: error.message })
//     }
// }

export async function getUserBookings(req, res) {
    try {
        const email = req.user.email
        const bookings = await getBookingsByEmail(email)
        res.status(200).json(bookings)
    } catch (error) {
        console.error('Error in getUserBookings:', error)
        res.status(500).json({ error: error.message })
    }
}

export async function updateBooking(req, res) {
    role = req.user.role 
    // role : admin@SNCC , admin@LHC ... etc
    // if role doesnt contain admin 
    if (!role.includes("admin")) {
        return res.status(403).json({ error: "Access denied. Only admins can update bookings." })
    }   

    
    try {
        const { id } = req.params
        const { status } = req.body
        
        if (!status) {
            return res.status(400).json({ error: "Status field is required" })
        }
        
        const updatedBooking = await updateBookingStatus(id, status)
        res.status(200).json({ message: "Booking updated successfully", updatedBooking })
    } catch (error) {
        console.error('Error in updateBooking:', error)
        res.status(500).json({ error: error.message })
    }
}

export async function removeBooking(req, res) {
    try {
        const { id } = req.params
        const email = req.user.email

        const deletedBooking = await deleteBooking(id,email)
        res.status(200).json({ message: "Booking deleted successfully", deletedBooking })
    } catch (error) {
        console.error('Error in removeBooking:', error)
        res.status(500).json({ error: error.message })
    }
}