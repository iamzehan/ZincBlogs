
export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen w-screen xl:w-[60vw] flex flex-col 
    items-center justify-center bg-zinc-950 text-zinc-100 overflow-hidden px-6">
      
      {/* 🌌 Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 blur-[140px] rounded-full" />
      </div>

      {/* Page content */}
      {children}
    </main>
  );
}