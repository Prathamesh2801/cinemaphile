import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectDB } from './config/db.js';
import { productionConfig } from './config/production.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import reviewRoutes from './routes/review.routes.js';
import movieRoutes from './routes/movie.routes.js';
import userRoutes from './routes/user.routes.js';

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? productionConfig.clientUrl 
    : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60 // Session TTL (1 day)
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Handle API 404
  app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
  });

  // Handle client-side routing
  app.get('*', (req, res) => {
    res.redirect(productionConfig.clientUrl);
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
