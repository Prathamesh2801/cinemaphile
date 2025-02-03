import { Star } from "lucide-react";

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

export default function MovieContent({
  title = "Inception",
  year = "2010",
  poster = "/placeholder.svg?height=450&width=300",
  plot = "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  runtime = "148 min",
  genre = ["Action", "Adventure", "Sci-Fi"],
  rating = "PG-13",
  director = "Christopher Nolan",
  actors = "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
  imdbRating = "8.8",
}: MovieProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-12">
          {/* Poster Section */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-zinc-800">
              <img
                src={poster || "/placeholder.svg"}
                alt={title}
                className="h-[300px] w-[300px] object-cover"
                loading="eager"
              />
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 p-4">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-bold">{imdbRating}</span>
              <span className="text-sm text-zinc-400">/10</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                {title} <span className="text-zinc-500">({year})</span>
              </h1>
              <div className="flex flex-wrap gap-2 text-sm text-zinc-400">
                <span>{runtime}</span>
                <span>•</span>
                <span>{rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {genre.map((g) => (
                <span
                  key={g}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-100"
                >
                  {g}
                </span>
              ))}
            </div>

            <div className="space-y-4 border-t border-zinc-800 pt-4">
              <p className="text-zinc-300">{plot}</p>
            </div>

            <div className="space-y-4 border-t border-zinc-800 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h2 className="text-sm font-semibold text-zinc-400">
                    Director
                  </h2>
                  <p className="text-zinc-100">{director}</p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-zinc-400">
                    Starring
                  </h2>
                  <p className="text-zinc-100">{actors}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
