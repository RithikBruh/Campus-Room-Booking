import {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
  deleteBooking,
  getBookingRequests as getBookingRequestsModel,
} from "../models/bookings.model.js";

import sendEmail from "../lib/resend.js";

export async function BookRoom(req, res) {
  try {
    const { venueId, date, startTime, endTime, reason } = req.body;
    const email = req.user.email;
    const bookingDate = new Date(date);

    if (!email || !venueId || !date || !startTime || !endTime || !reason) {
      return res
        .status(400)
        .json({
          error:
            "Missing required fields: email, venueId, date, startTime, endTime, reason",
        });
    }

    if (Number.isNaN(bookingDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const bookingResult = await createBooking(
      email,
      venueId,
      bookingDate,
      startTime,
      endTime,
      reason,
    );

    if (bookingResult && bookingResult.alreadyExists) {
      console.log(`Booking already exists for ${email} at venue ${venueId} on ${date}`);
      return res
        .status(409)
        .json({
          message: `Overlapping with another booking `,
          startTime: bookingResult.booking.startTime,
          endTime: bookingResult.booking.endTime,
        });
    }

    res
      .status(201)
      .json({
        message: "Booking created successfully",
        booking: bookingResult,
      });
  } catch (error) {
    console.error("Error in BookRoom:", error);
    res.status(500).json({ error: error.message });
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
    const email = req.user.email;
    const bookings = await getBookingsByEmail(email);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error in getUserBookings:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function removeBooking(req, res) {
  try {
    const { id } = req.params;
    const email = req.user.email;

    const deletedBooking = await deleteBooking(id, email);
    res
      .status(200)
      .json({ message: "Booking deleted successfully", deletedBooking });
  } catch (error) {
    console.error("Error in removeBooking:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getBookingRequests(req, res) {
  const role = req.user.role;
  if (!role.includes("admin")) {
    return res
      .status(403)
      .json({ error: "Access denied. Only admins can view booking requests." });
  }

  try {
    const bookingRequests = await getBookingRequestsModel(role);
    res.status(200).json(bookingRequests);
  } catch (error) {
    console.error("Error in getBookingRequests:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateBookingRequest(req, res) {
  const role = req.user.role;
  // role : admin@SNCC , admin@LHC ... etc
  // if role doesnt contain admin
  if (!role.includes("admin")) {
    return res
      .status(403)
      .json({ error: "Access denied. Only admins can update bookings." });
  }

  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status field is required" });
    }
    // ex : only admin@SNCC can approve/reject bookings for SNCC venues, admin@LHC can approve/reject bookings for LHC venue ... etc
    const updatedBooking = await updateBookingStatus(id, status, role);
    await sendEmail(updatedBooking);
    res
      .status(200)
      .json({ message: "Booking updated successfully", updatedBooking });
  } catch (error) {
    console.error("Error in updateBooking:", error);
    res.status(500).json({ error: error.message });
  }
}
