export const SkeletonBlogsTable = ({ rows = 6 }: { rows?: number }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-900 text-zinc-300">
            <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Date Created</th>
            <th className="px-4 py-3 text-center text-sm font-medium">
              Publish Status
            </th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr
              key={i}
              className="border-t border-zinc-800"
            >
              {/* Title */}
              <td className="px-4 py-3">
                <div className="h-4 w-[70%] rounded-md bg-zinc-800 animate-pulse" />
              </td>

              {/* Date */}
              <td className="px-4 py-3">
                <div className="h-3 w-[40%] rounded-md bg-zinc-800 animate-pulse" />
              </td>

              {/* Status */}
              <td className="px-4 py-3 flex justify-center">
                <div className="h-6 w-[120px] rounded-full bg-zinc-800 animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
