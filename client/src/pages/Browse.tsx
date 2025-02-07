// Browse.tsx
import { Layout } from "../layout/Layout";
import { BrowseCards } from "../components/BrowseCards";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../components/LoadingWave";

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
        const response = await fetch('http://localhost:5000/api/movies/top');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError('Failed to load movies');
        console.error('Error fetching movies:', err);
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
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-zinc-950 min-h-screen">
        <button
          onClick={() => window.history.back()}
          className="mb-12 flex items-center text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
          title="Go Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h1 className="text-3xl font-bold text-white mb-8 font-doto">Top Rated Movies</h1>
        
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 mx-auto space-y-4">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="break-inside-avoid mb-4">
              <BrowseCards movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
