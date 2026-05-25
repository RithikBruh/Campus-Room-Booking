import express from 'express'
import { createNewVenue, listAllVenues, deleteVenueHandler,listUserVenues } from '../controllers/venues.controller.js'

const router = express.Router()

// Get all venues with their IDs
// 
router.get('/venues', listAllVenues)

// Get venues created by the authenticated user
router.get('/my-venues', listUserVenues)

// Create a new venue
/*
only admin@...

body { venue : string }
*/
router.post('/venues', createNewVenue)

// Delete a venue by ID 
router.delete('/venues/:id', deleteVenueHandler)

export default router
