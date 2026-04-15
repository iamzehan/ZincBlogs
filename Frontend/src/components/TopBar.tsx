import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { AccountCircle, ArrowDropDown, Close, Menu } from "@mui/icons-material";
import { useAuth } from "../utils/hooks";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const dropdownRef = useRef<HTMLLIElement | null>(null);

  // Auto close menus on route change
  useEffect(() => {
    const handleEffects = async () => {
      setOpen(false);
      setProfileOpen(false);
    };
    handleEffects();
  }, [location.pathname]);

  // Close dropdown on outside click (important)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseClass = "transition text-sm";
  const inactiveClass = "text-zinc-400 hover:text-zinc-100";
  const activeClass = "text-zinc-100";

  const linkClass = (isActive: boolean) =>
    `${baseClass} ${isActive ? activeClass : inactiveClass}`;

  return (
    <>
      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-zinc-950/70 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/favicon.png" className="h-6 w-6" alt="logo" />
            <span className="text-zinc-200 font-semibold tracking-tight">
              Zinc<span className="text-zinc-400">Blogs</span>
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => linkClass(isActive)}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/blogs"
                className={({ isActive }) => linkClass(isActive)}
              >
                Read
              </NavLink>
            </li>

            {!isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => linkClass(isActive)}
                  >
                    Log in
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg font-medium transition ${
                        isActive
                          ? "bg-zinc-300 text-zinc-900"
                          : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                      }`
                    }
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}

            {/* ✅ PROFILE DROPDOWN */}
            {isAuthenticated && (
              <li ref={dropdownRef} className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  title="Profile"
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-700 transition"
                >
                  <div
                    className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-sm
                   ${profileOpen ? "bg-zinc-300 text-black" : "bg-zinc-600"}`}
                  >
                    {user &&
                      (
                        user?.firstName?.charAt(0) + user?.lastName?.charAt(0)
                      ).toUpperCase()}
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden">
                    <span
                      className="text-sm text-zinc-200
                     font-bold flex justify-center items-center p-2 gap-2 border-b border-b-zinc-500/50 bg-black"
                    >
                      <AccountCircle /> @{user?.username}
                    </span>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 border-b border-b-zinc-500/50 text-sm text-zinc-300 hover:bg-zinc-800"
                    >
                      Profile
                    </NavLink>

                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="w-full text-center px-4 py-2 text-sm text-red-400 hover:bg-zinc-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>

          {/* Burger */}
          <button
            onClick={() => setOpen(true)}
            className={`md:hidden w-10 h-8 border rounded border-zinc-500/20 flex items-center justify-center transition ${
              open ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 inset-0 z-150 md:hidden transition ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer */}
        <div
          className={`absolute h-[96%] mt-4 rounded-l-2xl right-0 w-[60vw]
             bg-zinc-900 border-l border-zinc-800 *:p-6 transform transition duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-0 p-1!
             w-8 h-8 flex items-center justify-center bg-zinc-600 rounded-bl-xl"
          >
            <Close />
          </button>

          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 mt-[0.05em] bg-black rounded-tl-[inherit]"
          >
            <img src="/favicon.png" className="h-6 w-6" alt="logo" />
            <span className="text-zinc-200 font-semibold tracking-tight">
              Zinc<span className="text-zinc-400">Blogs</span>
            </span>
          </NavLink>

          {/* Links */}
          <div className="flex flex-col gap-5 *:text-xl">
            <NavLink
              to="/"
              end
              className={({ isActive }) => linkClass(isActive)}
            >
              Home
            </NavLink>

            <NavLink
              to="/blogs"
              className={({ isActive }) => linkClass(isActive)}
            >
              Read
            </NavLink>

            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => linkClass(isActive)}
                >
                  Log in
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `mt-4 px-4 py-2 rounded-lg text-center font-medium transition ${
                      isActive
                        ? "bg-zinc-300 text-zinc-900"
                        : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                    }`
                  }
                >
                  Sign up
                </NavLink>
              </>
            )}

            {isAuthenticated && (
              <div className="flex flex-col border rounded-lg border-zinc-500/50 overflow-hidden">
                {/* 🔹 HEADER (always visible) */}
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="w-full text-center text-sm text-zinc-400"
                >
                  <span className="text-zinc-200 font-medium bg-black flex justify-center gap-2 py-2 px-3 items-center">
                    <AccountCircle />@{user?.username} {!profileOpen? <ArrowDropDown className="fixed right-8"/>: null}
                  </span>
                </button>

                {/* 🔻 EXPANDABLE CONTENT */}
                <div
                  className={`flex flex-col gap-4 px-3 transition-all duration-300 ${
                    profileOpen
                      ? "max-h-40 py-3 opacity-100"
                      : "max-h-0 opacity-0 pointer-events-none"
                  } overflow-hidden`}
                >
                  <NavLink
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => linkClass(isActive)}
                  >
                    Profile
                  </NavLink>

                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="text-center text-red-400 text-sm hover:text-red-300 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
