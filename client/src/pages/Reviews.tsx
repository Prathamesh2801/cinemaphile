import { Layout } from "../layout/Layout";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LoadingScreen } from "../components/LoadingWave";
import { Star, ArrowLeft } from "lucide-react";
import apiClient from "../api/apiClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  updatedAt: string;
}

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedReview, setEditedReview] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const response = await apiClient.get('/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingId(review._id);
    setEditedReview(review.review);
    setEditedRating(review.rating);
  };

  const handleUpdate = async (reviewId: string) => {
    try {
      const response = await apiClient.put(`/reviews/${reviewId}`, {
        rating: editedRating,
        review: editedReview
      });

      // Update the reviews array with the edited review
      setReviews(reviews.map(rev => 
        rev._id === reviewId ? response.data : rev
      ));

      setEditingId(null);
      setEditedReview("");
      setEditedRating(0);
      toast.success('Review updated successfully');
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await apiClient.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter(rev => rev._id !== reviewId));
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="space-y-6 mb-12">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
              title="Go Back"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-doto">Back</span>
            </button>
            
            <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-lg p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white font-doto">
                Movie Reviews
              </h1>
              <p className="text-neutral-400 mt-2 font-inter">
                All movie reviews in one place
              </p>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div 
                  key={review._id}
                  className="bg-neutral-900/30 rounded-lg p-6 border border-neutral-800/50 space-y-4 transition-all duration-200 hover:bg-neutral-900/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                        <span className="text-base font-medium text-neutral-400 font-doto">
                          {review.user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="font-doto text-neutral-300">
                          {review.user.username}
                        </span>
                        <p 
                          className="text-sm text-emerald-500 hover:text-emerald-400 cursor-pointer font-doto"
                          onClick={() => navigate(`/details/${review.movieId}`)}
                        >
                          {review.movieTitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {editingId === review._id ? (
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              onClick={() => setEditedRating(value)}
                              className={`p-1 ${
                                editedRating >= value ? 'text-yellow-400' : 'text-neutral-600'
                              }`}
                            >
                              <Star 
                                className={editedRating >= value ? 'fill-yellow-400' : ''} 
                                size={20} 
                              />
                            </button>
                          ))}
                        </div>
                      ) : (
                        [...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-5 w-5 ${
                              index < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-neutral-800'
                            }`}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  {editingId === review._id ? (
                    <div className="space-y-4">
                      <textarea
                        value={editedReview}
                        onChange={(e) => setEditedReview(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-neutral-900/50 border border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-all font-inter text-neutral-200"
                        rows={4}
                        required
                        minLength={10}
                        maxLength={500}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(review._id)}
                          className="px-4 py-2 bg-neutral-800 text-neutral-200 rounded-lg hover:bg-neutral-700 transition-colors font-doto"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/30 transition-colors font-doto"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-400 font-inter leading-relaxed">
                      {review.review}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm pt-4 border-t border-neutral-800/50">
                    <span className="text-neutral-500 font-doto">
                      {new Date(review.createdAt).toLocaleDateString()}
                      {review.createdAt !== review.updatedAt && ' (edited)'}
                    </span>
                    {user && user.id === review.user._id && (
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleEdit(review)}
                          className="text-neutral-400 hover:text-white transition-colors font-doto"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="text-red-400/70 hover:text-red-400 transition-colors font-doto"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-400 font-doto">No reviews found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
