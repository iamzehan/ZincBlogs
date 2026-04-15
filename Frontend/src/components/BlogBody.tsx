import { formatDate } from "../utils/helpers";
import Markdown from "./Markdown";

export default function BlogBody({
  data,
  children,
}: {
  data: BlogBody;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 🌌 BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 blur-[140px] rounded-full" />
      </div>

      <article className="relative max-w-3xl mx-auto mt-6 mb-6 border-b md:border p-5 md:rounded-lg border-zinc-500/20">
        {/* Title */}
        <h1
          className="text-3xl md:text-5xl font-bold tracking-tight leading-tight
        drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] text-left"
        >
          {data.title}
        </h1>

        {/* Author + Date */}
        <p className="mt-4 text-sm text-zinc-500 text-left">
          by{" "}
          <strong>
            {data.author.firstName} {data.author.lastName}
          </strong>{" "}
          • {formatDate(data.createdAt)}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2 cursor-pointer">
          {data.tags?.map((t: { id: string; tag: string }) => (
            <span
              key={t.id}
              className="text-xs px-2 py-1 rounded-md bg-zinc-800 
              text-zinc-400 hover:bg-purple-300/20 hover:text-purple-400 transition-all duration-200"
            >
              #{t.tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-zinc-800" />

        {/* Content */}
        <div
          className="
          md-wrapper
        "
        >
          <Markdown content={data.content}/>
        </div>
        {children}
      </article>
    </>
  );
}
