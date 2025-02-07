import express from 'express';
import { searchMovies, getMovieDetails, getTopMovies } from '../controllers/movie.controller.js';

const router = express.Router();

// Public routes
router.get('/search', searchMovies);
router.get('/top', getTopMovies);
router.get('/:id', getMovieDetails);

export default router;