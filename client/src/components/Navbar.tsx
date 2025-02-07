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
        className="flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 cursor-pointer"
      >
        <span className="font-doto">{user?.username}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-neutral-900 py-2 shadow-lg">
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-red-500 hover:bg-neutral-800/20 font-bold cursor-pointer"
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
    <nav className="py-2 text-neutral-100 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between">
        <Link
          to="/"
          className="font-doto group relative my-3 inline-block text-xl text-neutral-400 transition-colors after:transition-all after:duration-300 hover:text-white hover:after:w-full md:my-6 md:text-3xl"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
            Cinema
          </span>
          <span className="inline-block transition-transform delay-75 duration-300 group-hover:-translate-y-1">
            phile
          </span>
        </Link>
        <div className="flex items-center gap-0 md:gap-0.5">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Link
              to="/login"
              className="origin-bottom rounded-xl px-1 py-2 text-neutral-400 transition-all delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:text-white md:p-4"
            >
              <span className="font-doto text-base md:text-xl">Login</span>
            </Link>
          )}
        </div>
      </div>
      <ul className="font-inter flex gap-4 border-t border-neutral-800 pt-4 text-sm md:gap-8 md:text-base">
        <li>
          <NavLink
            to="/browse"
            className={({ isActive }) =>
              `text-neutral-400 hover:text-white transition-colors ${
                isActive ? "text-white" : ""
              }`
            }
          >
            Browse
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reviews"
            className={({ isActive }) =>
              `text-neutral-400 hover:text-white transition-colors ${
                isActive ? "text-white" : ""
              }`
            }
          >
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              `text-neutral-400 hover:text-white transition-colors bg-neutral-900 hover:bg-neutral-800 p-2 rounded-lg ${
                isActive ? "text-white" : ""
              }`
            }
          >
            Bookmarks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
