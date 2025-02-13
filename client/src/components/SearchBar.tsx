import React, { useState, useEffect, useRef } from "react";
import { searchMovies } from "../api/movie.api";
import { useDebounce } from "../hooks/useDebounce";
import { MovieSearchResult } from "../api/types/movie";
import { useNavigate } from "react-router-dom";

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<MovieSearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchMovies(debouncedQuery);
        setSuggestions(results);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: MovieSearchResult) => {
    setShowSuggestions(false);
    setQuery("");
    navigate(`/details/${suggestion.imdbID}`);
  };

  return (
    <div className="relative mx-auto mt-40 w-full shadow-xl md:w-[70%]">
      <div className="relative">
        <input
          type="text"
          className="font-doto w-full appearance-none rounded-lg bg-neutral-900/30 border border-neutral-800/50 px-6 py-4 text-lg text-neutral-300 shadow-inner focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-all duration-200"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChange}
          onClick={() => setShowSuggestions(true)}
          ref={inputRef}
          aria-label="Search for a movie"
        />

        {isLoading && (
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-neutral-400"></div>
          </div>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-neutral-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showSuggestions && (
        <ul className="absolute w-full bg-neutral-900/30 border border-neutral-800/50 text-neutral-300 rounded-lg shadow-lg mt-2 max-h-80 overflow-y-auto z-10 text-base font-inter">
          {isLoading ? (
            <li className="px-6 py-3 text-neutral-400">Searching...</li>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <li
                key={suggestion.imdbID}
                className="px-6 py-3 hover:bg-neutral-800/50 cursor-pointer hover:text-white flex items-center justify-start transition-all duration-200 border-b border-neutral-800/30 last:border-none"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <img
                  src={suggestion.Poster}
                  alt={suggestion.Title}
                  className="w-10 h-14 mr-4 rounded border border-neutral-800/50"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "placeholder_image.jpg";
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-medium">
                    {suggestion.Title}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-neutral-400 text-xs md:text-sm">
                      {suggestion.Year}
                    </span>
                    <span className="bg-neutral-800/50 text-xs md:text-sm px-2 py-0.5 rounded-full text-neutral-500">
                      {suggestion.Type}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : query ? (
            <li className="px-6 py-3 text-neutral-400">No results found</li>
          ) : (
            <li className="px-6 py-3 text-neutral-500">Try "The Matrix"</li>
          )}
        </ul>
      )}
    </div>
  );
};
