import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg bg-neutral-900/30 px-4 py-2 text-neutral-300 hover:text-white border border-neutral-800/50 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
            <span className="text-sm font-medium text-neutral-400">
              {user?.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-doto text-sm md:text-base">{user?.username}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-neutral-900/30 border border-neutral-800/50 py-2 shadow-lg">
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-neutral-400 hover:text-red-400 hover:bg-neutral-800/20 font-doto transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="py-4 text-neutral-100 backdrop-blur-sm border-b border-neutral-800/50">
      <div className="flex w-full items-center justify-between mb-8">
        <Link
          to="/"
          className="font-doto group relative inline-block text-xl text-neutral-300 transition-colors hover:text-white md:text-3xl"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
            Cinema
          </span>
          <span className="inline-block transition-transform delay-75 duration-300 group-hover:-translate-y-1">
            phile
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-neutral-900/30 px-4 py-2 text-neutral-300 hover:text-white border border-neutral-800/50 transition-all duration-200 font-doto"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-8">
        <NavLink
          to="/browse"
          className={({ isActive }) =>
            `relative px-3 py-2 font-doto text-sm md:text-base transition-all duration-200 ${
              isActive 
                ? "text-white" 
                : "text-neutral-400 hover:text-white"
            } after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:rounded-full after:transition-all after:duration-200 ${
              isActive
                ? "after:bg-neutral-100 after:opacity-100"
                : "after:bg-neutral-400 after:opacity-0 hover:after:opacity-30"
            }`}
        >
          Browse
        </NavLink>
        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            `relative px-3 py-2 font-doto text-sm md:text-base transition-all duration-200 ${
              isActive 
                ? "text-white" 
                : "text-neutral-400 hover:text-white"
            } after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:rounded-full after:transition-all after:duration-200 ${
              isActive
                ? "after:bg-neutral-100 after:opacity-100"
                : "after:bg-neutral-400 after:opacity-0 hover:after:opacity-30"
            }`}
        >
          Reviews
        </NavLink>
        <NavLink
          to="/trending"
          className={({ isActive }) =>
            `relative px-3 py-2 font-doto text-sm md:text-base transition-all duration-200 ${
              isActive 
                ? "text-white" 
                : "text-neutral-400 hover:text-white"
            } after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:rounded-full after:transition-all after:duration-200 ${
              isActive
                ? "after:bg-neutral-100 after:opacity-100"
                : "after:bg-neutral-400 after:opacity-0 hover:after:opacity-30"
            }`}
        >
          Bookmarks
        </NavLink>
      </div>
    </nav>
  );
};
