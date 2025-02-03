import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
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
          <div className="origin-bottom rounded-xl px-1 py-2 text-neutral-400 transition-all delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:text-white md:p-4">
            <a href="">
              <h1 className="font-doto text-sm md:text-xl">Login</h1>
            </a>
          </div>
          <div>
            <h1 className="font-doto text-xl">/</h1>
          </div>
          <div className="origin-bottom rounded-xl px-1 py-2 text-neutral-400 transition-all delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:text-white md:p-4">
            <a href="">
              <h1 className="font-doto text-sm md:text-xl">Signup</h1>
            </a>
          </div>
        </div>
      </div>
      <ul className="font-playfair-display flex gap-4 border-t border-neutral-800 pt-2 text-sm md:gap-8 md:text-xl">
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
