import { createVenue, getAllVenues, deleteVenue } from "../models/venues.model.js"

export async function createNewVenue(req, res) {
    // only admin@<SNCC/LHC/..etc> can create venues
    const authUser = req.user.role
    // console.log("Auth user in createNewVenue:", authUser) // Debug log to check the role of the authenticated user
    if (!authUser.includes("admin")) {
        return res.status(403).json({ error: "Access denied. Only admins can create venues." })
    }

    try {
        const {venue} = req.body
        
        if (!venue) {
            return res.status(400).json({ error: "Missing required fields: venue, authUser" })
        }
        
        const newVenue = await createVenue(venue, authUser)
        res.status(201).json({ message: "Venue created successfully", venue: newVenue })
    } catch (error) {
        console.error('Error in createNewVenue:', error)
        res.status(500).json({ error: error.message })
    }
}

export async function listAllVenues(req, res) {
    // every auth user can see the venues
    try {
        const venues = await getAllVenues()
        res.status(200).json(venues)
    } catch (error) {
        console.error('Error in listAllVenues:', error)
        res.status(500).json({ error: error.message })
    }
}

export async function listUserVenues(req, res) {
    // every auth user can see the venues created by them
    try {
        const user = req.user.role
        const venues = await getAllVenues(user)
        res.status(200).json(venues)
    } catch (error) {
        console.error('Error in listUserVenues:', error)
        res.status(500).json({ error: error.message })
    }
}

export async function deleteVenueHandler(req, res) {
    if (!req.user.role.includes("admin")) { 
        return res.status(403).json({ error: "Access denied. Only admins can delete venues." })
    }

    try {
        const { id } = req.params
        const deletedVenue = await deleteVenue(id, req.user.role)
        res.status(200).json({ message: "Venue deleted successfully", venue: deletedVenue })
    } catch (error) {
        console.error('Error in deleteVenueHandler:', error)
        res.status(500).json({ error: error.message })
    }
}

