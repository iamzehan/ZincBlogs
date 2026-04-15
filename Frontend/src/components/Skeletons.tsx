import { useIsMobile } from "../utils/hooks";

export function SkeletonCard() {
  return (
    <div
      className="relative p-6 rounded-2xl 
      bg-zinc-900/70 backdrop-blur border border-zinc-800
      overflow-hidden"
    >
      {/* ✨ subtle glow layer */}
      <div
        className="absolute inset-0 
        bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_70%)]"
      />

      {/* shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 
          bg-linear-to-r from-transparent via-white/10 to-transparent 
          -translate-x-full animate-[shimmer_1.8s_infinite]"
        />
      </div>

      {/* content */}
      <div className="relative space-y-4">
        {/* title */}
        <div className="h-5 w-2/3 bg-zinc-800 rounded-md animate-pulse" />

        {/* author + date */}
        <div className="h-3 w-1/3 bg-zinc-800 rounded-md animate-pulse" />

        {/* paragraph */}
        <div className="space-y-2">
          <div className="h-3 bg-zinc-800 rounded-md animate-pulse" />
          <div className="h-3 bg-zinc-800 rounded-md animate-pulse w-5/6" />
          <div className="h-3 bg-zinc-800 rounded-md animate-pulse w-4/6" />
        </div>

        {/* tags */}
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-14 bg-zinc-800 rounded-md animate-pulse" />
          <div className="h-5 w-12 bg-zinc-800 rounded-md animate-pulse" />
          <div className="h-5 w-16 bg-zinc-800 rounded-md animate-pulse" />
        </div>
        {/* stats skeleton */}
        <div className="flex items-center gap-5 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-zinc-800 animate-pulse" />
            <div className="w-6 h-3 rounded bg-zinc-800 animate-pulse" />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-zinc-800 animate-pulse" />
            <div className="w-6 h-3 rounded bg-zinc-800 animate-pulse" />
          </div>
        </div>
        {/* button */}
        <div className="h-4 w-24 bg-zinc-800 rounded-md animate-pulse mt-4" />
      </div>
    </div>
  );
}

export function BlogSkeleton() {
  const isMobile = useIsMobile();
  return (
    <main className="relative min-h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* 🌌 BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 blur-[140px] rounded-full" />
      </div>

      {/* ✨ GLOBAL SHIMMER WRAPPER */}
      <div className="relative">
        <article className="relative max-w-3xl mx-auto px-6 py-20 space-y-6">
          {/* Title */}
          <div className="h-10 md:h-12 w-3/4 bg-zinc-800 rounded-md" />

          {/* Author + Date */}
          <div className="h-4 w-1/3 bg-zinc-800 rounded-md" />

          {/* Tags */}
          <div className="flex gap-2 mt-2">
            <div className="h-5 w-16 bg-zinc-800 rounded-md" />
            <div className="h-5 w-14 bg-zinc-800 rounded-md" />
            <div className="h-5 w-20 bg-zinc-800 rounded-md" />
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-zinc-800" />

          {/* Image */}
          <div className="h-64 w-full bg-zinc-800 rounded-xl" />

          {/* Paragraphs */}
          <div className="space-y-3 mt-6">
            <div className="h-4 bg-zinc-800 rounded-md" />
            <div className="h-4 w-5/6 bg-zinc-800 rounded-md" />
            <div className="h-4 w-4/6 bg-zinc-800 rounded-md" />
            <div className="h-4 bg-zinc-800 rounded-md" />
          </div>

          <div className="space-y-3 mt-6">
            <div className="h-4 bg-zinc-800 rounded-md" />
            <div className="h-4 w-5/6 bg-zinc-800 rounded-md" />
            <div className="h-4 w-3/6 bg-zinc-800 rounded-md" />
          </div>
          {/* stats skeleton (matches Like + Comment buttons) */}
          <div className="mt-4 flex items-center gap-2 w-full rounded-lg">
            {/* Like skeleton */}
            <div className="flex-1 flex items-center gap-2 px-4 py-4 rounded-[inherit] bg-zinc-800/50">
              <div className="w-5 h-5 rounded bg-zinc-700 animate-pulse" />
              <div className="w-4 h-3 rounded bg-zinc-700 animate-pulse" />
            </div>

            {/* Comment skeleton */}
            <div className="flex-1 flex items-center gap-2 px-4 py-4 rounded-[inherit] bg-zinc-800/50">
              <div className="w-5 h-5 rounded bg-zinc-700 animate-pulse" />
              <div className="w-12 h-3 rounded bg-zinc-700 animate-pulse" />
              <div className="w-6 h-5 rounded-full bg-zinc-700 animate-pulse ml-1" />
            </div>
          </div>
        </article>
        {/* Comment Box skeleton */}
        <div className="w-full flex justify-center">
          <div
            className={`
         w-full max-w-3xl py-5 px-2 md:p-5 md:rounded-lg
        bg-zinc-900
        animate-pulse ${isMobile? "fixed bottom-0": ""}`
      }
          >
            <div className="w-full flex gap-3 items-start">
              {/* Avatar skeleton */}
              <div className="w-10 h-10 rounded-full bg-zinc-800 shrink-0" />

              {/* input + button */}
              <div className="flex-1 flex gap-2 items-center">
                {/* textarea skeleton */}
                <div className="flex-1 h-10 md:h-12 rounded-lg bg-zinc-800/80 border border-zinc-700" />

                {/* button skeleton */}
                <div className="w-24 h-10 md:h-9 rounded-lg bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>
        {/* Comments */}
        <div className="max-w-3xl mx-auto px-6">
          <CommentsSkeleton />
        </div>

        {/* 🔥 SINGLE SHIMMER LAYER */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute inset-0
              bg-linear-to-r from-transparent via-white/10 to-transparent
              -translate-x-full
              animate-[shimmer_2s_infinite]
            "
          />
        </div>
      </div>
    </main>
  );
}

export function CommentsSkeleton() {
  return (
    <div className="space-y-4 mt-8 pb-10">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="flex gap-4 p-5 bg-zinc-800/50 rounded-2xl shadow-md shadow-zinc-900/20"
        >
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-zinc-700" />

          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 bg-zinc-700 rounded" />
            <div className="h-3 w-full bg-zinc-700 rounded" />
            <div className="h-3 w-5/6 bg-zinc-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
