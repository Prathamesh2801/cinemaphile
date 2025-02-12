import apiClient from './apiClient';
import { Comment } from './types/comment';

export const getMovieComments = async (movieId: string): Promise<Comment[]> => {
  try {
    const response = await apiClient.get(`/comments/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return [];
  }
};

export const createComment = async (movieId: string, content: string): Promise<Comment | null> => {
  try {
    const response = await apiClient.post(`/comments/${movieId}`, { content });
    return response.data;
  } catch (error) {
    console.error("Failed to create comment:", error);
    return null;
  }
}; 