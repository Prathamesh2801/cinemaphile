import express from 'express';
import { searchMovies, getMovieDetails } from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/search', searchMovies);
router.get('/:id', getMovieDetails);

export default router;