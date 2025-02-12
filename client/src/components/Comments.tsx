import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Comment } from '../api/types/comment';
import { getMovieComments, createComment } from '../api/comments.api';
import toast from 'react-hot-toast';

interface CommentsProps {
  movieId: string;
}

export const Comments = ({ movieId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [movieId]);

  const fetchComments = async () => {
    const fetchedComments = await getMovieComments(movieId);
    setComments(fetchedComments);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const comment = await createComment(movieId, newComment.trim());
      if (comment) {
        setComments(prev => [comment, ...prev]);
        setNewComment('');
        toast.success('Comment posted successfully!');
      }
    } catch (error) {
      toast.error('Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 md:mt-12 rounded-none md:rounded-lg relative p-[1px] md:border-none border-t border-zinc-800">
      <h2 className="text-2xl font-bold mb-6 font-doto mt-3">Comments</h2>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all font-inter text-neutral-100 min-h-[100px] resize-y"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="mt-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-doto"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-neutral-900 rounded-lg border border-neutral-800 text-neutral-400">
          Please <a href="/login" className="text-neutral-100 hover:underline">sign in</a> to leave a comment.
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-doto text-neutral-100">{comment.username}</span>
              <span className="text-sm text-neutral-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-neutral-300 font-inter">{comment.content}</p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <div className="text-center text-neutral-500 py-8">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
}; 