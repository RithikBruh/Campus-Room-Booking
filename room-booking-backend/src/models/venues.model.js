import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function createVenue(venue_loc, authUser) {
    try {
        const newVenue = await prisma.venue.create({
            data: {
                venue: venue_loc,
                authUser
            }
        })
        console.log(`Created new venue: ${venue_loc} by ${authUser}`)
        return newVenue
    } catch (error) {
        console.error('Error creating venue:', error)
        throw error
    }
}

export async function getAllVenues(user = null) {
    // if user is provided, return only the venues created by that user, else return all venues
    try {
        if (user) {
            const venues = await prisma.venue.findMany({
                where: {
                    authUser: user
                },
                select: {
                    id: true,
                    venue: true,
                    authUser: true
                }
            })
            return venues
        }

        const venues = await prisma.venue.findMany({
            select: {
                id: true,
                venue: true,
                authUser: true
            }
        })
        return venues
    } catch (error) {
        console.error('Error fetching venues:', error)
        throw error
    }
}

export async function deleteVenue(id, authUser) {
    try {
        // only the admin who created the venue can delete theirs
        const deletedVenue = await prisma.venue.delete({
            where: { id: parseInt(id),authUser }
        })
        console.log(`Deleted venue ${id}`)
        return deletedVenue
    } catch (error) {
        console.error('Error deleting venue:', error)
        throw error
    }
}

