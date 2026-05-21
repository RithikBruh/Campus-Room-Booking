import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function createVenue(venue, authUser) {
    try {
        const newVenue = await prisma.venue.create({
            data: {
                venue,
                authUser
            }
        })
        console.log(`Created new venue: ${venue} by ${authUser}`)
        return newVenue
    } catch (error) {
        console.error('Error creating venue:', error)
        throw error
    }
}

export async function getVenueById(id) {
    try {
        const venueData = await prisma.venue.findUnique({
            where: { id: parseInt(id) }
        })
        return venueData
    } catch (error) {
        console.error('Error fetching venue:', error)
        throw error
    }
}

export async function getVenueByName(venueName) {
    try {
        const venueData = await prisma.venue.findUnique({
            where: { venue: venueName }
        })
        return venueData
    } catch (error) {
        console.error('Error fetching venue:', error)
        throw error
    }
}

export async function getAllVenues() {
    try {
        const venues = await prisma.venue.findMany()
        return venues
    } catch (error) {
        console.error('Error fetching venues:', error)
        throw error
    }
}

export async function editVenue(id, venue, authUser) {
    try {
        const updatedVenue = await prisma.venue.update({
            where: { id: parseInt(id) },
            data: {
                venue,
                authUser
            }
        })
        console.log(`Updated venue ${id}`)
        return updatedVenue
    } catch (error) {
        console.error('Error updating venue:', error)
        throw error
    }
}

export async function deleteVenue(id) {
    try {
        const deletedVenue = await prisma.venue.delete({
            where: { id: parseInt(id) }
        })
        console.log(`Deleted venue ${id}`)
        return deletedVenue
    } catch (error) {
        console.error('Error deleting venue:', error)
        throw error
    }
}
