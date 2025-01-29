// api/types/movie.ts
export interface MovieSearchResult {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
}

// Keep Movie for detailed view if needed
export interface Movie extends MovieSearchResult {
  Plot?: string;
  Ratings?: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime?: string;
  Genre?: string;
}