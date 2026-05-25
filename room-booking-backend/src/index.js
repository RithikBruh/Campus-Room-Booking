import express from 'express';
import cors from 'cors';
import { authMiddleware } from './middleware/auth.middleware.js';
import venueRoutes from './routes/venue.route.js';
import bookingsRoutes from './routes/bookings.route.js';


const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ??
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Enable CORS for local development (allow the frontend dev server)
app.use(cors({ origin: 'http://localhost:3001'
  // TODO: add cookies 
 }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Campus Room Booking System');
});




// PROTECTED ROUTES FROM HERE ------ 
app.use(authMiddleware);


app.get("/me",(req,res)=>{
  console.log('ok ',req.user.role)
  res.json({role: req.user.role})
})

app.use(venueRoutes);
app.use(bookingsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
