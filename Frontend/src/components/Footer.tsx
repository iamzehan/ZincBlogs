import { NavLink } from "react-router-dom";
import { GitHub, X, LinkedIn, MailOutline } from "@mui/icons-material";
import { useAuth } from "../utils/hooks";

export default function Footer() {

  const { isAuthenticated } = useAuth();
  const linkClass = (isActive: boolean) =>
    `relative text-sm transition px-2 py-1 rounded-md
   ${
     isActive
       ? "text-white bg-zinc-800/60"
       : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40"
   }`;
  return (
    <footer className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950 text-zinc-300">
      {/* 🌌 subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 col-span-1 justify-center md:justify-start">
            <img alt="logo" src="/favicon.png" className="h-10 md:h-6 aspect-square" />
            <span className="font-semibold text-zinc-200 text-2xl">
              Zinc<span className="text-zinc-400">Blogs</span>
            </span>
          </div>

          <p className="text-sm text-zinc-500 max-w-xs leading-relaxed text-justify">
            A minimal blogging platform focused on clarity, speed, and raw
            developer expression.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col w-full gap-2 items-center *:px-5 *:place-content-center *:h-10 *:w-full *:lg:text-left">
          <span className="text-xl font-medium text-zinc-200 mb-2 p-1 w-full lg:text-left">
            Explore
          </span>

          <NavLink to="/" end className={({ isActive }) => linkClass(isActive)}>
            Home
          </NavLink>

          <NavLink
            to="/blogs"
            className={({ isActive }) => linkClass(isActive)}
          >
            Blogs
          </NavLink>

          {!isAuthenticated && (
            <NavLink
              to="/login"
              className={({ isActive }) => linkClass(isActive)}
            >
              Login
            </NavLink>
          )}

          {!isAuthenticated && (
            <NavLink
              to="/signup"
              className={({ isActive }) => linkClass(isActive)}
            >
              Sign up
            </NavLink>
          )}
        </div>

        {/* Social / Contact */}
        <div className="flex flex-col gap-3">
          <span className="text-xl font-medium 
          text-zinc-200 mb-2 p-1 w-full">
            Connect
          </span>

          <div className="flex items-center justify-center gap-4 w-full">
            <a href="#" className="text-zinc-500 hover:text-white transition">
              <GitHub />
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition">
              <X />
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition">
              <LinkedIn />
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition">
              <MailOutline />
            </a>
          </div>

          <p className="text-xs text-zinc-500 mt-2 flex-1 flex flex-col justify-end">
            Built for developers who prefer substance over noise.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500">
          <span>
            © {new Date().getFullYear()} ZincBlogs | All rights reserved.
          </span>

          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-zinc-300 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-zinc-300 transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
