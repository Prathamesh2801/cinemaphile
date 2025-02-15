import { Review } from '../models/Review.js';

// Get logged-in user's reviews
export const getAllReviews = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const reviews = await Review.find({ user: userId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ message: 'Error getting reviews' });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { movieId, movieTitle, rating, review } = req.body;
    const userId = req.userId;

    // Validate input
    if (!movieId || !movieTitle || !rating || !review) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    if (review.length < 10 || review.length > 500) {
      return res.status(400).json({ message: 'Review must be between 10 and 500 characters' });
    }

    // Check if user has already reviewed this movie
    const existingReview = await Review.findOne({ movieId, user: userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this movie' });
    }

    const newReview = new Review({
      movieId,
      movieTitle,
      user: userId,
      rating,
      review
    });

    await newReview.save();

    // Populate user data before sending response
    const populatedReview = await Review.findById(newReview._id).populate('user', 'username');
    res.status(201).json(populatedReview);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Error creating review' });
  }
};

// Get reviews for a movie
export const getMovieReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movieId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Error getting reviews' });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const reviewId = req.params.id;
    const userId = req.userId;

    // Validate input
    if (!rating || !review) {
      return res.status(400).json({ message: 'Rating and review are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    if (review.length < 10 || review.length > 500) {
      return res.status(400).json({ message: 'Review must be between 10 and 500 characters' });
    }

    const existingReview = await Review.findOne({ _id: reviewId, user: userId });
    if (!existingReview) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    existingReview.rating = rating;
    existingReview.review = review;
    await existingReview.save();

    // Populate user data before sending response
    const populatedReview = await Review.findById(existingReview._id).populate('user', 'username');
    res.json(populatedReview);
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ message: 'Error updating review' });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.userId;

    const result = await Review.deleteOne({ _id: reviewId, user: userId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Error deleting review' });
  }
}; 