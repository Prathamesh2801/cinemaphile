// Browse.tsx
import { Layout } from "../layout/Layout";
import { BrowseCards } from "../components/BrowseCards";

const DEMO_MOVIES = [
  {
    imdbID: "1",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    Type: "movie",
  },
  {
    imdbID: "2",
    Title: "The Dark Knight",
    Year: "2008",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    Type: "movie",
  },
  {
    imdbID: "3",
    Title: "Interstellar",
    Year: "2014",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    Type: "movie",
  },
  {
    imdbID: "4",
    Title: "Pulp Fiction",
    Year: "1994",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    Type: "movie",
  },
  {
    imdbID: "5",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    Type: "movie",
  },
  {
    imdbID: "6",
    Title: "Gladiator",
    Year: "2000",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_.jpg",
    Type: "movie",
  },
  {
    imdbID: "7",
    Title: "The Shawshank Redemption",
    Year: "1994",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg",
    Type: "movie",
  },
  {
    imdbID: "8",
    Title: "Fight Club",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "9",
    Title: "Forrest Gump",
    Year: "1994",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpgg",
    Type: "movie",
  },
  {
    imdbID: "10",
    Title: "The Godfather",
    Year: "1972",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "11",
    Title: "Goodfellas",
    Year: "1990",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BN2E5NzI2ZGMtY2VjNi00YTRjLWI1MDUtZGY5OWU1MWJjZjRjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "12",
    Title: "The Silence of the Lambs",
    Year: "1991",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDdhOGJhYzctYzYwZC00YmI2LWI0MjctYjg4ODdlMDExYjBlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "13",
    Title: "Saving Private Ryan",
    Year: "1998",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZGZhZGQ1ZWUtZTZjYS00MDJhLWFkYjctN2ZlYjE5NWYwZDM2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "14",
    Title: "Schindler's List",
    Year: "1993",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNjM1ZDQxYWUtMzQyZS00MTE1LWJmZGYtNGUyNTdlYjM3ZmVmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "15",
    Title: "The Green Mile",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "16",
    Title: "Jurassic Park",
    Year: "1993",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "17",
    Title: "The Lion King",
    Year: "1994",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZGRiZDZhZjItM2M3ZC00Y2IyLTk3Y2MtMWY5YjliNDFkZTJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "18",
    Title: "Titanic",
    Year: "1997",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "19",
    Title: "The Terminator",
    Year: "1984",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmE0YzIxM2QtMGNlMi00MjRmLWE3MWMtOWQzMGVjMmU0YTFmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    Type: "movie",
  },
  {
    imdbID: "20",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTNlOTRmOTEtMTAyMi00NjFiLTk3NDMtNWI0YzA3ZTZlYjZiXkEyXkFqcGc@._V1_.jpg",
    Type: "movie",
  },
];

export const Browse = () => {
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
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 mx-auto space-y-4">
          {DEMO_MOVIES.map((movie) => (
            <div key={movie.imdbID} className="break-inside-avoid mb-4">
              <BrowseCards movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
