import { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { useAuth } from "../context/AuthContext";
import { BrowseCards } from "../components/BrowseCards";
import { LoadingScreen } from "../components/LoadingWave";
import { ArrowLeft } from "lucide-react";
import apiClient from "../api/apiClient";
import toast from "react-hot-toast";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  imdbRating: string;
}

export const Bookmarks = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        // Get bookmarked movie IDs
        const bookmarksResponse = await apiClient.get('/users/bookmarks');
        const { savedMovies } = bookmarksResponse.data;

        // Fetch details for each movie
        const moviePromises = savedMovies.map(async (movieId: string) => {
          const response = await apiClient.get(`/movies/${movieId}`);
          return response.data;
        });

        const movieDetails = await Promise.all(moviePromises);
        setMovies(movieDetails);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        toast.error('Failed to load bookmarked movies');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedMovies();
  }, [isAuthenticated]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-lg p-6 text-center">
              <p className="text-neutral-400">Please login to view your bookmarks</p>
            </div>
          </div>
        </div>
      </Layout>
    );
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
                Your Bookmarks
              </h1>
              <p className="text-neutral-400 mt-2 font-inter">
                Movies you've saved for later
              </p>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div 
                key={movie.imdbID}
                className="transform transition-all duration-300 hover:-translate-y-1"
              >
                <BrowseCards movie={movie} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {movies.length === 0 && (
            <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-lg p-8 text-center">
              <p className="text-neutral-400 font-doto">No bookmarked movies yet</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
