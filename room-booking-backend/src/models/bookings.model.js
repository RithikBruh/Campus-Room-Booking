import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkBookingAvailability(email, venueId, date, givenstartTime, givenendTime) {
  try {
    return await prisma.bookings.findFirst({
      where: {
        email,
        venueId: parseInt(venueId),
        date,
        startTime : {
          lt: givenendTime
        },
        endTime: {
          gt: givenstartTime,
        },
        status : "approved" 
      },
      include: { venue: true },
    });
  } catch (error) {
    console.error("Error checking booking availability:", error);
    throw error;
  }
}

export async function createBooking(email, venueId, date, startTime, endTime, reason) {
  try {
    // Check if an  booking clash exists (same email, venue, date and time range)
    const existingBooking = await checkBookingAvailability(email, venueId, date, startTime, endTime);

    if (existingBooking) {
      console.log(`Booking already exists for ${email} at venue ${venueId} on ${date}`);
      return { alreadyExists: true, booking: existingBooking };
    }

    const newBooking = await prisma.bookings.create({
      data: {
        email,
        status: "pending", // default status for new bookings
        venueId: parseInt(venueId),
        date,
        startTime,
        endTime,
        reason,
      },
      include: {
        venue: true,
      },
    });
    console.log(`Created new booking with ID ${newBooking.id} for ${email}`);
    return newBooking;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

// export async function getBookingById(id) {
//     try {
//         const booking = await prisma.bookings.findUnique({
//             where: { id: parseInt(id) },
//             include: {
//                 venue: true
//             }
//         })
//         return booking
//     } catch (error) {
//         console.error('Error fetching booking:', error)
//         throw error
//     }
// }

export async function getBookingsByEmail(email) {
  try {
    const bookings = await prisma.bookings.findMany({
      where: { email },
      include: {
        venue: true,
      },
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

export async function updateBookingStatus(id, status, role) {
  try {
    const updatedBooking = await prisma.bookings.update({
      where: {
        id: parseInt(id),
        venue: {
          is: {
            authUser: role,
          },
        },
      }, // only the admin of the venue can update the booking status
      data: { status },
    });
    console.log(`Updated booking ${id} status to ${status}`);
    
    return updatedBooking;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

export async function deleteBooking(id, email) {
  try {
    // only self can delete their booking
    const deletedBooking = await prisma.bookings.delete({
      where: { id: parseInt(id), email },
    });
    console.log(`Deleted booking ${id}`);
    return deletedBooking;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}

export async function getBookingRequests(role) {
  try {
    const bookingRequests = await prisma.bookings.findMany({
      where: {
        status: "pending",
        venue: {
          is: {
            authUser: role,
          },
        },
      },
      include: {
        venue: true,
      },
    });
    return bookingRequests;
  } catch (error) {
    console.error("Error fetching booking requests:", error);
    throw error;
  }
}
