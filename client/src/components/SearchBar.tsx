import React, { useState, useEffect, useRef } from "react";
import { searchMovies } from "../api/movie.api";
import { useDebounce } from "../hooks/useDebounce";
import { MovieSearchResult } from "../api/types/movie";

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<MovieSearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setQuery(suggestion.Title);
    setShowSuggestions(false);
  };

  return (
    <div className="relative mx-auto mt-40 w-full shadow-xl md:w-[70%]">
      <div className="relative">
        <input
          type="text"
          className="font-doto w-full appearance-none rounded-lg bg-neutral-900 px-6 py-4 text-lg text-white shadow-inner focus:outline-none"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onClick={() => setShowSuggestions(true)}
          ref={inputRef}
        />

        {isLoading && (
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 transform text-neutral-500"
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
        <ul className="absolute w-full bg-neutral-900 text-neutral-400 rounded-lg shadow-lg mt-1 max-h-80 overflow-y-auto z-10 text-lg font-playfair-display">
          {isLoading ? (
            <li className="px-6 py-3 text-white">Searching...</li>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <li
                key={suggestion.imdbID}
                className="px-6 py-3 hover:bg-neutral-800 cursor-pointer hover:text-white"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.Title} ({suggestion.Year})
              </li>
            ))
          ) : query ? (
            <li className="px-6 py-3 text-white">No results found</li>
          ) : (
            <li className="px-6 py-3 text-white">Start typing to search</li>
          )}

         
        </ul>
      )}


     
    </div>
  );
};
