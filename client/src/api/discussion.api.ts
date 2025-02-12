import apiClient from './apiClient';

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
  updatedAt: string;
  type: 'review' | 'comment';
}

export const getMovieDiscussions = async (movieId: string): Promise<Discussion[]> => {
  try {
    const [reviews, comments] = await Promise.all([
      apiClient.get(`/reviews/movie/${movieId}`),
      apiClient.get(`/comments/${movieId}`)
    ]);

    const formattedReviews = reviews.data.map((review: any) => ({
      ...review,
      type: 'review'
    }));

    const formattedComments = comments.data.map((comment: any) => ({
      ...comment,
      type: 'comment'
    }));

    return [...formattedReviews, ...formattedComments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Failed to fetch discussions:", error);
    return [];
  }
};

export const createReview = async (movieId: string, movieTitle: string, rating: number, review: string): Promise<Discussion | null> => {
  try {
    const response = await apiClient.post('/reviews', {
      movieId,
      movieTitle,
      rating,
      review
    });
    return { ...response.data, type: 'review' };
  } catch (error) {
    console.error("Failed to create review:", error);
    throw error;
  }
};

export const createComment = async (movieId: string, content: string): Promise<Discussion | null> => {
  try {
    const response = await apiClient.post(`/comments/${movieId}`, { content });
    return { ...response.data, type: 'comment' };
  } catch (error) {
    console.error("Failed to create comment:", error);
    throw error;
  }
};

export const updateReview = async (reviewId: string, rating: number, review: string): Promise<Discussion | null> => {
  try {
    const response = await apiClient.put(`/reviews/${reviewId}`, {
      rating,
      review
    });
    return { ...response.data, type: 'review' };
  } catch (error) {
    console.error("Failed to update review:", error);
    throw error;
  }
};

export const deleteDiscussion = async (type: 'review' | 'comment', id: string): Promise<void> => {
  try {
    await apiClient.delete(`/${type}s/${id}`);
  } catch (error) {
    console.error(`Failed to delete ${type}:`, error);
    throw error;
  }
}; 