import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";
import ConfirmationModal from "./ConfirmationModal";

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
  const [userInput, setUserInput] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const reviewFormRef = useRef<HTMLDivElement>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [reviewToDeleteId, setReviewToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const fetchReviews = async () => {
    try {
      const response = await apiClient.get(`/reviews/movie/${movieId}`);
      setReviews(response.data);
    } catch (error) {
      toast.error("Failed to load reviews");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        const response = await apiClient.put(`/reviews/${editingId}`, {
          rating,
          review: userInput,
        });

        // Update the reviews array with the edited review
        setReviews(
          reviews.map((rev) => (rev._id === editingId ? response.data : rev))
        );

        toast.success("Review updated successfully");
        setEditingId(null);
      } else {
        const response = await apiClient.post("/reviews", {
          movieId,
          movieTitle,
          rating,
          review: userInput,
        });

        // Add the new review to the reviews array
        setReviews([response.data, ...reviews]);
        toast.success("Review submitted successfully");
      }

      setUserInput("");
      setRating(0);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to submit review";
      toast.error(errorMessage);
      console.error("Review submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setReviewToDeleteId(id);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsConfirmationModalOpen(false);
    try {
      await apiClient.delete(`/reviews/${reviewToDeleteId}`);
      // Remove the deleted review from the reviews array
      setReviews(reviews.filter((rev) => rev._id !== reviewToDeleteId));
      toast.success("Review deleted successfully");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete review";
      toast.error(errorMessage);
      console.error("Review deletion error:", error);
    } finally {
      setReviewToDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setIsConfirmationModalOpen(false);
    setReviewToDeleteId(null);
  };

  const handleEdit = (review: Review) => {
    setEditingId(review._id);
    setUserInput(review.review);
    setRating(review.rating);
    // Scroll to the review form
    reviewFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setUserInput("");
    setRating(0);
  };

  return (
    <>
      <div className="mt-20 space-y-6">
        {isAuthenticated ? (
          <div
            ref={reviewFormRef}
            className="space-y-4 bg-neutral-900/30 p-6 rounded-lg border border-neutral-800/50"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                  <span className="text-base font-medium text-neutral-400 font-inter">
                    {user?.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-inter text-neutral-300">
                  {user?.username}
                </span>
              </div>

              <div className="flex items-center gap-1 bg-zinc-900/50 p-2 rounded-lg border border-zinc-800 sm:ml-auto">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`p-1.5 rounded-md hover:bg-zinc-800 transition-colors ${
                      rating >= value ? "text-yellow-400" : "text-zinc-600"
                    }`}
                  >
                    <Star
                      className={rating >= value ? "fill-yellow-400" : ""}
                      size={20}
                    />
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-neutral-900/50 border border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-all font-inter"
                placeholder="Write your review..."
                rows={4}
                required
                minLength={10}
                maxLength={500}
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-2.5 bg-transparent hover:bg-neutral-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-emerald-600 font-inter border-2 border-neutral-800 cursor-pointer"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : editingId
                    ? "Update Review"
                    : "Submit Review"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-2.5 bg-transparent hover:bg-red-900/20 text-red-400 rounded-lg transition-colors font-inter border-2 border-red-900/50 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div
            ref={reviewFormRef}
            className="p-6 bg-neutral-900/30 rounded-lg text-zinc-400 border border-neutral-800/50"
          >
            Please{" "}
            <a href="/login" className="text-neutral-500 hover:underline">
              sign in
            </a>{" "}
            to write a review.
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-inter mt-12 mb-8">Reviews</h2>

          {reviews.map((review) => (
            <div
              key={review._id}
              className="space-y-4 bg-neutral-900/30 p-6 rounded-lg border border-neutral-800/50 transition-colors duration-200 hover:bg-neutral-900/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                    <span className="text-base font-medium text-neutral-400 font-inter">
                      {review.user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-inter text-neutral-300">
                    {review.user.username}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-neutral-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-neutral-400 font-inter leading-relaxed">
                {review.review}
              </p>

              <div className="flex items-center justify-between text-sm pt-2 border-t border-neutral-800/50">
                <span className="text-neutral-500 font-mono">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                {user && user.id === review.user._id && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(review)}
                      className="text-neutral-400 hover:text-white transition-colors font-inter p-2 border border-neutral-800/50 md:text-lg text-base cursor-pointer hover:bg-neutral-800/50 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-red-400/70 hover:text-red-400 transition-colors font-inter p-2 border border-neutral-800/50 md:text-lg text-base cursor-pointer hover:bg-neutral-800/50 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center text-neutral-500 py-12 font-inter">
              No reviews yet. Be the first to review!
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this review?"
      />
    </>
  );
};
