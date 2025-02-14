import { Star, Bookmark, BookmarkCheck, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/movie.api";
import { LoadingScreen } from "./LoadingWave";
import { useAuth } from "../context/AuthContext";
import { ScrollShadow } from "./ScrollShadow";
import { MovieReviews } from "./MovieReviews";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";


interface MovieProps {
  title: string;
  year: string;
  poster: string;
  plot: string;
  runtime: string;
  genre: string[];
  rating: string;
  director: string;
  actors: string;
  imdbRating: string;
}

export default function MovieContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState<MovieProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      try {
        const details = await getMovieDetails(id);
        console.log(details);
        setMovieData({
          title: details.Title,
          year: details.Year,
          poster: details.Poster,
          plot: details.Plot,
          runtime: details.Runtime,
          genre: details.Genre.split(", "),
          rating: details.Rated,
          director: details.Director,
          actors: details.Actors,
          imdbRating: details.imdbRating,
        });
        if (user && user.savedMovies && user.savedMovies.includes(id)) {
          setIsSaved(true);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, user]);

  const handleSave = async () => {
    if (!user) {
      toast.error('Please login to bookmark movies');
      return;
    }

    try {
      if (isSaved) {
        await apiClient.delete(`/users/bookmarks/${id}`);
        toast.success('Removed from bookmarks');
        setIsSaved(false);
      } else {
        await apiClient.post('/users/bookmarks', { movieId: id });
        toast.success('Added to bookmarks');
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error handling bookmark:', error);
      toast.error('Failed to update bookmark');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!movieData) {
    return (
      <>
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center">
          <div className="text-xl">Movie not found</div>
          <button
            onClick={() => navigate(-1)}
            className="bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  const {
    title,
    year,
    poster,
    plot,
    runtime,
    genre,
    rating,
    director,
    actors,
    imdbRating,
  } = movieData;

  return (
    <>
      <ScrollShadow />
      <div className="min-h-screen bg-neutral-950 text-neutral-100 font-inter mt-16">
        <div className="container mx-auto space-y-6">
          <div className="flex w-full items-center justify-between mb-20">
          <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
              title="Go Back"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-doto">Back</span>
            </button>

            <button
              onClick={handleSave}
              className={`flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer`}
              title={isSaved ? "Saved" : "Save"}
            >
              <span>
                {isSaved ? <BookmarkCheck color="green" /> : <Bookmark />}
              </span>
              <span className="text-sm font-medium">{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-12">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border border-neutral-800">
                <img
                  src={poster || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="flex items-center justify-center gap-2 rounded-lg border border-neutral-800 p-4 bg-neutral-900/30">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-xl font-bold font-doto">{imdbRating}</span>
                <span className="text-base text-neutral-400 font-doto">/10</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-6 bg-neutral-900/30 rounded-lg p-6 border border-neutral-800/50">
                <div className="space-y-2">
                  <h1 className="text-xl md:text-4xl font-bold tracking-tight font-doto">
                    {title} <span className="text-neutral-500">({year})</span>
                  </h1>
                  <div className="flex flex-wrap gap-2 text-sm text-neutral-400">
                    <span>{runtime}</span>
                    <span>•</span>
                    <span>{rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {genre.map((g) => (
                    <span
                      key={g}
                      className="rounded-full bg-neutral-800 px-3 py-1 text-sm font-medium text-neutral-600 hover:text-neutral-300 transition-all duration-200 cursor-pointer"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/30 rounded-lg p-6 border border-neutral-800/50">
                <h2 className="text-xl font-bold mb-4 font-doto text-neutral-100">Plot</h2>
                <p className="text-neutral-300 leading-relaxed">{plot}</p>
              </div>

              <div className="bg-neutral-900/30 rounded-lg p-6 border border-neutral-800/50">
                <h2 className="text-xl font-bold mb-4 font-doto text-neutral-100">Cast & Crew</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-400 font-doto mb-2">
                      Director
                    </h3>
                    <p className="text-neutral-100">{director}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-400 font-doto mb-2">
                      Starring
                    </h3>
                    <p className="text-neutral-100">{actors}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <MovieReviews movieId={id!} movieTitle={movieData.title} />
          </div>
        </div>
      </div>
    </>
  );
}
