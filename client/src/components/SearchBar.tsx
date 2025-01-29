import React, { useState, useEffect, useRef } from "react";

interface Movie {
  title: string;
}

const mockMovieData: Movie[] = [
  { title: "Star Wars: Episode IV - A New Hope" },
  { title: "Star Wars: Episode V - The Empire Strikes Back" },
  { title: "Star Wars: Episode VI - Return of the Jedi" },
  { title: "Star Wars: Episode I - The Phantom Menace" },
  { title: "Star Wars: Episode II - Attack of the Clones" },
  { title: "Star Wars: Episode III - Revenge of the Sith" },
  { title: "Star Wars: Episode VII - The Force Awakens" },
  { title: "Star Wars: Episode VIII - The Last Jedi" },
  { title: "Star Wars: Episode IX - The Rise of Skywalker" },
  { title: "Rogue One: A Star Wars Story" },
  { title: "Solo: A Star Wars Story" },
  { title: "The Mandalorian" },
  { title: "The Book of Boba Fett" },
  { title: "Obi-Wan Kenobi" },
  { title: "Andor" },
  { title: "The Matrix" },
  { title: "The Matrix Reloaded" },
  { title: "The Matrix Revolutions" },
  { title: "John Wick" },
  { title: "John Wick: Chapter 2" },
  { title: "John Wick: Chapter 3 – Parabellum" },
  { title: "John Wick: Chapter 4" },
  { title: "Interstellar" },
  { title: "Inception" },
  { title: "The Dark Knight" },
  { title: "The Dark Knight Rises" },
  { title: "Batman Begins" },
  { title: "Spider-Man" },
  { title: "Spider-Man 2" },
  { title: "Spider-Man 3" },
  { title: "The Avengers" },
  { title: "Avengers: Age of Ultron" },
  { title: "Avengers: Infinity War" },
  { title: "Avengers: Endgame" },
  { title: "Iron Man" },
  { title: "Iron Man 2" },
  { title: "Iron Man 3" },
  { title: "Captain America: The First Avenger" },
  { title: "Captain America: The Winter Soldier" },
  { title: "Captain America: Civil War" },
];

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Movie[]>(mockMovieData);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filterSuggestions = () => {
      const filteredSuggestions = mockMovieData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    };

    filterSuggestions();
  }, [query]);

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

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: Movie) => {
    setQuery(suggestion.title);
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

      {showSuggestions && suggestions.length > 0 && (
        <ul className="font-playfair-display absolute z-10 mt-1 max-h-80 w-full overflow-y-auto rounded-lg bg-neutral-900 text-lg text-neutral-400 shadow-lg">
          {" "}
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.title}
              className="cursor-pointer px-6 py-3 hover:bg-neutral-800 hover:text-white"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
      {showSuggestions && suggestions.length === 0 && query.length > 0 && (
        <div className="absolute mt-1 w-full rounded-b-lg bg-neutral-900 px-6 py-3 text-lg text-white shadow-lg">
          {" "}
          No results found.
        </div>
      )}
    </div>
  );
};
