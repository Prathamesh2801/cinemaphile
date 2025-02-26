import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import {
  getMovieDiscussions,
  createReview,
  createComment,
  updateReview,
  deleteDiscussion,
} from "../api/discussion.api";

interface MovieDiscussionProps {
  movieId: string;
  movieTitle: string;
}

interface Discussion {
  _id: string;
  movieId: string;
  movieTitle: string;
  user: {
    _id: string;
    username: string;
  };
  content?: string;
  rating?: number;
  review?: string;
  createdAt: string;
  type: "review" | "comment";
}

export const MovieDiscussion = ({
  movieId,
  movieTitle,
}: MovieDiscussionProps) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [activeTab, setActiveTab] = useState<"reviews" | "comments">("reviews");
  const [userInput, setUserInput] = useState("");
  const [rating, setRating] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchDiscussions();
  }, [movieId]);

  const fetchDiscussions = async () => {
    try {
      const data = await getMovieDiscussions(movieId);
      setDiscussions(data);
    } catch (error) {
      toast.error("Failed to load discussions");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to participate in discussions");
      return;
    }

    setIsSubmitting(true);
    try {
      if (activeTab === "reviews") {
        if (editingId) {
          await updateReview(editingId, rating, userInput);
          toast.success("Review updated successfully");
        } else {
          await createReview(movieId, movieTitle, rating, userInput);
          toast.success("Review submitted successfully");
        }
      } else {
        await createComment(movieId, userInput);
        toast.success("Comment posted successfully");
      }

      setUserInput("");
      setRating(1);
      setEditingId(null);
      fetchDiscussions();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (type: "review" | "comment", id: string) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      await deleteDiscussion(type, id);
      toast.success(`${type} deleted successfully`);
      fetchDiscussions();
    } catch (error) {
      toast.error(`Failed to delete ${type}`);
    }
  };

  const handleEdit = (discussion: Discussion) => {
    setEditingId(discussion._id);
    setUserInput(
      discussion.type === "review" ? discussion.review! : discussion.content!
    );
    if (discussion.type === "review") {
      setRating(discussion.rating!);
      setActiveTab("reviews");
    } else {
      setActiveTab("comments");
    }
  };

  return (
    <div className="mt-12 space-y-8">
      <div className="flex gap-4 border-b border-zinc-800">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-2 ${
            activeTab === "reviews"
              ? "text-white border-b-2 border-emerald-500 font-semibold"
              : "text-zinc-400"
          }`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`pb-2 ${
            activeTab === "comments"
              ? "text-white border-b-2 border-emerald-500 font-semibold"
              : "text-zinc-400"
          }`}
        >
          Comments
        </button>
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "reviews" && (
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`p-2 rounded-lg ${
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
          )}

          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all"
            placeholder={
              activeTab === "reviews"
                ? "Write your review..."
                : "Write your comment..."
            }
            rows={4}
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting
              ? "Submitting..."
              : editingId
              ? "Update"
              : activeTab === "reviews"
              ? "Submit Review"
              : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="p-4 bg-zinc-900 rounded-lg text-zinc-400">
          Please{" "}
          <a href="/login" className="text-emerald-500 hover:underline">
            sign in
          </a>{" "}
          to participate in discussions.
        </div>
      )}

      <div className="space-y-6">
        {discussions
          .filter((d) =>
            activeTab === "reviews" ? d.type === "review" : d.type === "comment"
          )
          .map((discussion) => (
            <div
              key={discussion._id}
              className="p-4 bg-zinc-900 rounded-lg space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-emerald-500">
                      {discussion.user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">
                    {discussion.user.username}
                  </span>
                </div>
                {discussion.type === "review" && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold font-mono">
                      {discussion.rating}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-zinc-300">
                {discussion.type === "review"
                  ? discussion.review
                  : discussion.content}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500 font-mono">
                  {new Date(discussion.createdAt).toLocaleDateString()}
                </span>
                {user && user.id === discussion.user._id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(discussion)}
                      className="text-zinc-400 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(discussion.type, discussion._id)
                      }
                      className="text-red-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

        {discussions.filter((d) =>
          activeTab === "reviews" ? d.type === "review" : d.type === "comment"
        ).length === 0 && (
          <div className="text-center text-zinc-500 py-8">
            No {activeTab} yet. Be the first to{" "}
            {activeTab === "reviews" ? "review" : "comment"}!
          </div>
        )}
      </div>
    </div>
  );
};
