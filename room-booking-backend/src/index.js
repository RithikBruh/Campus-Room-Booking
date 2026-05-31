import express from 'express';
import cors from 'cors';
import { authMiddleware } from './middleware/auth.middleware.js';
import {adminMiddleware} from './middleware/admin.middleware.js'

import adminVenueRoutes from './routes/admin.venue.routes.js';
import venueRoutes from './routes/venue.route.js';
import bookingsRoutes from './routes/bookings.route.js';
import adminBookingRequestRoutes from './routes/admin.booking.route.js';

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ??
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



// Enable CORS for local development (allow the frontend dev server)
// app.use(cors({ origin: 'http://localhost:3001'
//   // TODO: add cookies 
//  }));

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      process.env.FRONTEND_URL || "http://localhost:3000",
    ],
    credentials: true, //cookies later
  })
);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Campus Room Booking System');
});




// PROTECT THE  ROUTES FROM HERE ------ 

// TODO : better admin middleware later
app.get("/me",authMiddleware,(req,res)=>{
  res.json({role: req.user.role})
})

app.use(authMiddleware,venueRoutes);

app.use(authMiddleware,bookingsRoutes);

// ADMIN PROTECTED ROUTES ------
app.use(adminMiddleware,adminVenueRoutes);
app.use(adminMiddleware,adminBookingRequestRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
