import {
  EmojiObjects as Thinking,
  DesignServices as Design,
  Code as Technology,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/hooks";

export default function Page() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      {/* 🌌 BACKGROUND GLOW BLOBS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-zinc-700/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-zinc-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-zinc-400/10 blur-3xl rounded-full" />
      </div>

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 py-28 flex flex-col items-center text-center">
        {/* Badge */}
        <span className="text-xs uppercase tracking-widest text-zinc-500 border border-zinc-700 px-3 py-1 rounded-full backdrop-blur">
          Minimalism • Tech • Design
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Welcome to{" "}
          <span className="text-zinc-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            Zinc Blogs
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-xl text-zinc-400 text-lg">
          A place for sharp thinking, clean design, and ideas that actually
          matter.
        </p>

        {/* CTA */}
        <div className="mt-10 flex gap-4">
          {/* Primary Button */}
          {!isAuthenticated && (
            <button
              onClick={() => navigate("/signup")}
              className="relative px-6 py-3 rounded-xl bg-zinc-200 text-zinc-900 font-medium transition-all duration-300 
            hover:bg-zinc-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] 
            before:absolute before:inset-0 before:rounded-xl before:bg-white/10 before:blur-lg before:opacity-0 hover:before:opacity-100"
            >
              Sign up
            </button>
          )}

          {/* Secondary Button */}
          <button
            onClick={() => navigate("/blogs")}
            className="relative px-6 py-3 rounded-xl border border-zinc-700 text-zinc-200 transition-all duration-300 
            hover:bg-zinc-800 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Start Reading
          </button>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="relative max-w-6xl mx-auto px-6 pb-28 grid md:grid-cols-3 gap-6">
        {/* CARD */}
        <div
          className="group p-6 rounded-2xl bg-zinc-900/70 backdrop-blur border border-zinc-800 
        hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300
        hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] cursor-pointer"
        >
          <Technology className="text-zinc-300 mb-3 group-hover:scale-110 transition" />
          <h3 className="text-lg font-semibold">Tech Blogs</h3>
          <p className="text-zinc-400 mt-2">
            Practical insights, not recycled tutorials.
          </p>
        </div>

        <div
          className="group p-6 rounded-2xl bg-zinc-900/70 backdrop-blur border border-zinc-800 
        hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300
        hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] cursor-pointer"
        >
          <Design className="text-zinc-300 mb-3 group-hover:scale-110 transition" />
          <h3 className="text-lg font-semibold">Design</h3>
          <p className="text-zinc-400 mt-2">
            Clean UI, fundamentals and modern systems.
          </p>
        </div>

        <div
          className="group p-6 rounded-2xl bg-zinc-900/70 backdrop-blur border border-zinc-800 
        hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300
        hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] cursor-pointer"
        >
          <Thinking className="text-zinc-300 mb-3 group-hover:scale-110 transition" />
          <h3 className="text-lg font-semibold">Thinking</h3>
          <p className="text-zinc-400 mt-2">Ideas that cut through noise.</p>
        </div>
      </section>
    </main>
  );
}
