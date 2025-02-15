import express from 'express';
import { createReview, getMovieReviews, updateReview, deleteReview, getAllReviews } from '../controllers/review.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/movie/:movieId', getMovieReviews);

// Protected routes (require authentication)
router.get('/', auth, getAllReviews);
router.post('/', auth, createReview);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

export default router; 