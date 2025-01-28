import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="backdrop-blur-sm text-neutral-100 p-2">
      <Link
        to="/"
        className="text-3xl text-neutral-400 font-doto mt-6 mb-4 inline-block
          relative after:absolute after:bottom-0 after:left-0
          after:h-[2px] after:w-0 after:bg-neutral-400
          after:transition-all after:duration-300
          hover:after:w-full hover:text-white
          transition-colors group"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
          Cinema
        </span>
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1 delay-75">
          phile
        </span>
      </Link>
      <ul className="flex gap-4 font-playfair-display text-xl">
        <li>
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              `text-neutral-400 hover:text-white transition-colors ${
                isActive ? "text-white" : ""
              }`
            }
          >
            Trending
          </NavLink>
        </li>
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
      </ul>
    </nav>
  );
};
