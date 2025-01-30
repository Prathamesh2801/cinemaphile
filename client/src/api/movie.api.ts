import apiClient from './apiClient';
import { MovieSearchResult } from './types/movie';

export const searchMovies = async (query: string): Promise<MovieSearchResult[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    // This matches your server route: /api/movies/search
    const response = await apiClient.get('/movies/search', {
      params: { query }
    });

    // Handle OMDB API errors
    if (response.data.message) {
      console.error('OMDB API Error:', response.data.message);
      return [];
    }

    // Check if response.data.Search exists and is an array
    const results = response.data.Search;
    if (!Array.isArray(results)) {
      console.error('Search results are not in expected format:', results);
      return [];
    }

    return results.map(movie => ({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Type: movie.Type
    }));
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await apiClient.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    throw error;
  }
};