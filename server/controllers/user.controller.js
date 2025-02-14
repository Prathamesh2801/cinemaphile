import { User } from '../models/User.js';

// Add movie to user's bookmarks
export const addBookmark = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if movie is already bookmarked
    if (user.savedMovies.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already bookmarked' });
    }

    user.savedMovies.push(movieId);
    await user.save();

    res.json({ message: 'Movie bookmarked successfully', savedMovies: user.savedMovies });
  } catch (error) {
    console.error('Add bookmark error:', error);
    res.status(500).json({ message: 'Error adding bookmark' });
  }
};

// Remove movie from user's bookmarks
export const removeBookmark = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.savedMovies = user.savedMovies.filter(id => id !== movieId);
    await user.save();

    res.json({ message: 'Movie removed from bookmarks', savedMovies: user.savedMovies });
  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({ message: 'Error removing bookmark' });
  }
};

// Get user's bookmarked movies
export const getBookmarks = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ savedMovies: user.savedMovies });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ message: 'Error getting bookmarks' });
  }
}; 