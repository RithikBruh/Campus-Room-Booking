import express from 'express';
import cors from 'cors';
import { authMiddleware } from './middleware/auth.middleware.js';

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ??
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Enable CORS for local development (allow the frontend dev server)
app.use(cors({ origin: 'http://localhost:5173'
  // TODO: add cookies 
 }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Campus Room Booking System');
});

// PROTECTED ROUTES FROM HERE ------ 
app.use(authMiddleware);
app.get('/my-bookings',(req,res)=>{

  res.json({ message: `Hello  ${req.user.email} Role : ${req.user.role}, here are your bookings! ${Object.keys(req.user).length}` });
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
