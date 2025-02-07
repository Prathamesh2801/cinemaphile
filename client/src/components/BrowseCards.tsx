import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MovieData {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type?: string;
}

export const BrowseCards: React.FC<{ movie: MovieData }> = ({ movie }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div
      className="w-full rounded-xl overflow-hidden relative bg-zinc-800 shadow-lg transition-all duration-300"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={movie.Poster === "N/A" ? "/placeholder.svg" : movie.Poster}
          alt={movie.Title}
          className="w-full object-cover"
          style={{ minHeight: "200px", maxHeight: "400px" }}
          loading="lazy"
        />

        <div
          className={`absolute inset-0 transition-opacity duration-200 cursor-pointer`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/70 ${
              isHovered ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          ></div>{" "}
          <div
            className={`absolute inset-0 backdrop-blur-lg ${
              isHovered ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300 flex flex-col justify-end p-4`}
          >
            {" "}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white line-clamp-1">
                {movie.Title}
              </h3>{" "}
              <p className="text-sm text-zinc-300">{movie.Year}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
