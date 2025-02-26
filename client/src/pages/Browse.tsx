import { Layout } from "../layout/Layout";
import { BrowseCards } from "../components/BrowseCards";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../components/LoadingWave";
import { ScrollShadow } from "../components/ScrollShadow";
import { ArrowLeft } from "lucide-react";
import { getTopMovies } from "../api/movie.api";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  imdbRating: string;
  Type?: string;
}

export const Browse = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const data = await getTopMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to load movies");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-lg p-6 text-center text-red-400">
              {error}
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
              <span className="font-inter">Back</span>
            </button>

            <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-lg p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white font-inter">
                Top Rated Movies
              </h1>
              <p className="text-neutral-400 mt-2 font-inter">
                Discover the highest-rated films across all genres
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
          {movies.length === 0 && !loading && !error && (
            <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-lg p-8 text-center">
              <p className="text-neutral-400 font-inter">No movies found</p>
            </div>
          )}
        </div>
      </div>
      <ScrollShadow />
    </Layout>
  );
};
