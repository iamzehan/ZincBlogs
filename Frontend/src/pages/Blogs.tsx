import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchAllBlogs } from "../utils/requests.blog";
import { SkeletonCard } from "../components/Skeletons";
import { formatDate } from "../utils/helpers";

import { FavoriteBorder, Comment } from "@mui/icons-material";

function stripMarkdown(md: string) {
  return md
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/[#_*>\-`]/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

function truncate(text: string, limit = 160) {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "...";
}

export default function Page() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
  });

  console.log(data);

  if (isLoading) {
    return <BlogsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Failed to load blogs.
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 ">
      {/* 🌌 STRONG BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-zinc-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 blur-[140px] rounded-full" />
      </div>

      <section className="relative max-w-4xl mx-auto px-6 py-20 space-y-10">
        {/* Heading */}
        <h1
          className="text-3xl font-bold tracking-tight 
        drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
        >
          Latest Blogs
        </h1>

        {/* Blog List */}
        <div className="space-y-6">
          {data?.map((blog: Blogs) => {
            const cleanText = truncate(stripMarkdown(blog.content));

            return (
              <div
                key={blog.id}
                onClick={() => navigate(`/blogs/${blog.id}`)}
                className="relative cursor-pointer group p-6 rounded-2xl text-left
                
                bg-zinc-900/70 backdrop-blur border border-zinc-800 
                transition-all duration-300
                
                hover:-translate-y-1
                hover:border-zinc-500
                
                hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                {/* ✨ GLOW OVERLAY (important) */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none
                bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]"
                />

                {/* Title */}
                <h2
                  className="text-xl font-semibold transition
                group-hover:text-white 
                group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                >
                  {blog.title}
                </h2>

                {/* Author + Date */}
                <p className="text-sm text-zinc-500 mt-1">
                  by {blog.author.firstName} {blog.author.lastName} •{" "}
                  {formatDate(blog.createdAt)}
                </p>

                {/* Content */}
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  {cleanText}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t.tag.id}
                      className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-400
                      group-hover:bg-zinc-700 transition"
                    >
                      #{t.tag.tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="mt-4 flex items-center gap-5 text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 hover:text-zinc-200 transition">
                    <FavoriteBorder
                      fontSize="small"
                      className="text-zinc-500"
                    />
                    <span>{blog._count.likes ?? 0}</span>
                  </span>

                  <span className="flex items-center gap-1.5 hover:text-zinc-200 transition">
                    <Comment fontSize="small" className="text-zinc-500" />
                    <span>{blog._count.comments ?? 0}</span>
                  </span>
                </div>

                {/* Read More */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/blogs/${blog.id}`);
                  }}
                  className="mt-5 text-sm text-zinc-300 transition border border-zinc-500/0
                  rounded-full px-2 py-1 cursor-pointer
                  hover:text-white
                  hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] hover:border-zinc-500/20"
                >
                  Read more →
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function BlogsSkeleton() {
  return (
    <main className="relative min-h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* same background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-zinc-400/10 rounded-full blur-[120px]" />
      </div>

      <section className="relative max-w-4xl mx-auto px-6 py-20 space-y-6">
        {/* heading skeleton */}
        <div className="h-8 w-40 bg-zinc-800 rounded-md animate-pulse justify-self-center" />

        {/* list */}
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
