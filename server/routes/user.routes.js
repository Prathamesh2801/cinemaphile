import express from 'express';
import { addBookmark, removeBookmark, getBookmarks } from '../controllers/user.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/bookmarks', auth, addBookmark);
router.delete('/bookmarks/:movieId', auth, removeBookmark);
router.get('/bookmarks', auth, getBookmarks);

export default router; 