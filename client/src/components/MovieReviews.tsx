import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '../api/apiClient';

interface MovieReviewsProps {
  movieId: string;
  movieTitle: string;
}

interface Review {
  _id: string;
  movieId: string;
  movieTitle: string;
  user: {
    _id: string;
    username: string;
  };
  rating: number;
  review: string;
  createdAt: string;
}

export const MovieReviews = ({ movieId, movieTitle }: MovieReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userInput, setUserInput] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const fetchReviews = async () => {
    try {
      const response = await apiClient.get(`/reviews/movie/${movieId}`);
      setReviews(response.data);
    } catch (error) {
      toast.error('Failed to load reviews');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        await apiClient.put(`/reviews/${editingId}`, {
          rating,
          review: userInput
        });
        toast.success('Review updated successfully');
      } else {
        await apiClient.post('/reviews', {
          movieId,
          movieTitle,
          rating,
          review: userInput
        });
        toast.success('Review submitted successfully');
      }

      setUserInput('');
      setRating(0);
      setEditingId(null);
      fetchReviews();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await apiClient.delete(`/reviews/${id}`);
      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  const handleEdit = (review: Review) => {
    setEditingId(review._id);
    setUserInput(review.review);
    setRating(review.rating);
  };

  return (
    <div className="mt-12 space-y-8">
      <h2 className="text-2xl font-bold font-doto">Reviews</h2>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`p-2 rounded-lg ${
                  rating >= value ? 'text-yellow-400' : 'text-zinc-600'
                }`}
              >
                <Star 
                  className={rating >= value ? 'fill-yellow-400' : ''} 
                  size={24} 
                />
              </button>
            ))}
          </div>

          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all"
            placeholder="Write your review..."
            rows={4}
            required
            minLength={10}
            maxLength={500}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting
              ? 'Submitting...'
              : editingId
              ? 'Update Review'
              : 'Submit Review'}
          </button>
        </form>
      ) : (
        <div className="p-4 bg-zinc-900 rounded-lg text-zinc-400">
          Please <a href="/login" className="text-emerald-500 hover:underline">sign in</a> to write a review.
        </div>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="p-4 bg-zinc-900 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-emerald-500">
                    {review.user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium">{review.user.username}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-zinc-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-zinc-300">{review.review}</p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
              {user && user.id === review.user._id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="text-zinc-400 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center text-zinc-500 py-8">
            No reviews yet. Be the first to review!
          </div>
        )}
      </div>
    </div>
  );
}; 