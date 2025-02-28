import { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { useAuth } from "../context/AuthContext";
// import { BrowseCards } from "../components/BrowseCards";
import { LoadingScreen } from "../components/LoadingWave";
import { ArrowLeft } from "lucide-react";
import apiClient from "../api/apiClient";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Star } from "lucide-react";

interface SavedMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  imdbRating?: string;
}

export const Bookmarks = () => {
  const [savedMovies, setSavedMovies] = useState<SavedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        // Get bookmarked movie IDs
        const bookmarksResponse = await apiClient.get("/users/bookmarks");
        const { savedMovies } = bookmarksResponse.data;

        // Fetch details for each movie
        const moviePromises = savedMovies.map(async (movieId: string) => {
          const response = await apiClient.get(`/movies/${movieId}`);
          return response.data;
        });

        const movieDetails = await Promise.all(moviePromises);
        setSavedMovies(movieDetails);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        toast.error("Failed to load bookmarked movies");
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
        <div className="min-h-screen bg-neutral-950 text-neutral-100">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-lg p-6 text-center">
              <p className="text-neutral-400">
                Please login to view your bookmarks
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
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
                Bookmarks
              </h1>
              <p className="text-neutral-400 mt-2 font-inter">
                Your saved bookmarks will appear here
              </p>
            </div>
          </div>
          <div className="mt-12 space-y-8">
            {loading ? (
              <LoadingScreen />
            ) : savedMovies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedMovies.map((movie) => (
                  <div
                    key={movie.imdbID}
                    onClick={() => navigate(`/details/${movie.imdbID}`)}
                    className="flex items-start gap-4 p-4 bg-neutral-900/30 rounded-lg border border-neutral-800/50 hover:bg-neutral-900/50 transition-all duration-200 cursor-pointer group"
                  >
                    <img
                      src={
                        movie.Poster === "N/A"
                          ? "/placeholder.svg"
                          : movie.Poster
                      }
                      alt={movie.Title}
                      className="w-20 h-28 object-cover rounded-md border border-neutral-800/50 group-hover:border-neutral-700/50 transition-all duration-200"
                    />

                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-neutral-100 truncate font-doto group-hover:text-white transition-colors duration-200">
                        {movie.Title}
                      </h3>

                      <div className="mt-2 flex items-center gap-4">
                        <span className="text-sm text-neutral-400 font-inter">
                          {movie.Year}
                        </span>

                        {movie.imdbRating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold text-yellow-400">
                              {movie.imdbRating}
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            await apiClient.delete(
                              `/users/bookmarks/${movie.imdbID}`
                            );
                            setSavedMovies(
                              savedMovies.filter(
                                (m) => m.imdbID !== movie.imdbID
                              )
                            );
                            toast.success("Movie removed from bookmarks");
                          } catch (error) {
                            console.error("Error removing bookmark:", error);
                            toast.error(
                              "Failed to remove movie from bookmarks"
                            );
                          }
                        }}
                        className="mt-4 self-start px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-all duration-200 font-doto border-1 border-neutral-800 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <p className="text-neutral-400 text-lg font-inter">
                  No bookmarked movies yet
                </p>
                <Link
                  to="/browse"
                  className="px-6 py-2.5 bg-neutral-900/30 hover:bg-neutral-900/50 text-neutral-300 hover:text-white rounded-lg transition-all duration-200 font-inter border border-neutral-800/50"
                >
                  Browse Movies
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};
