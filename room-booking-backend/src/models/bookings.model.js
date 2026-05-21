import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function createBooking(email, status, venue, timing, reason) {
    try {
        const newBooking = await prisma.bookings.create({
            data: {
                email,
                status,
                venue,
                timing,
                reason
            }
        })
        console.log(`Created new booking with ID ${newBooking.id} for ${email}`)
        return newBooking
    } catch (error) {
        console.error('Error creating booking:', error)
        throw error
    }
}

export async function getBookingById(id) {
    try {
        const booking = await prisma.bookings.findUnique({
            where: { id: parseInt(id) }
        })
        return booking
    } catch (error) {
        console.error('Error fetching booking:', error)
        throw error
    }
}

export async function getBookingsByEmail(email) {
    try {
        const bookings = await prisma.bookings.findMany({
            where: { email }
        })
        return bookings
    } catch (error) {
        console.error('Error fetching bookings:', error)
        throw error
    }
}

export async function updateBookingStatus(id, status) {
    try {
        const updatedBooking = await prisma.bookings.update({
            where: { id: parseInt(id) },
            data: { status }
        })
        console.log(`Updated booking ${id} status to ${status}`)
        return updatedBooking
    } catch (error) {
        console.error('Error updating booking:', error)
        throw error
    }
}

export async function deleteBooking(id, email) {
    try {
        // only self can delete their booking
        const deletedBooking = await prisma.bookings.delete({
            where: { id: parseInt(id), email }
        })
        console.log(`Deleted booking ${id}`)
        return deletedBooking
    } catch (error) {
        console.error('Error deleting booking:', error)
        throw error
    }
}
