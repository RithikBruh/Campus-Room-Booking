import express from 'express'
import { createNewVenue, listAllVenues, deleteVenueHandler,listUserVenues } from '../controllers/venues.controller.js'

const router = express.Router()

// Get all venues with their IDs
// 
router.get('/venues', listAllVenues)

export default router
