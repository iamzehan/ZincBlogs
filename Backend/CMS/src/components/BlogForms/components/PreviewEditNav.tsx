import { useBlog } from "../../../utils/hooks";
import clsx from "clsx";
import { EditDocument, Preview } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

export default function PreviewEdit() {
  const { preview, setPreview } = useBlog();

  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* sentinel */}
      <div ref={sentinelRef} />

      <div
        className={clsx(
          "preview",
        {
          "expand": isSticky
        }
        )}
      >
        {/* Edit */}
        <div
          onClick={() => setPreview(false)}
          className={clsx(
            "cursor-pointer bg-transparent p-2 w-full flex gap-2 items-center justify-center md:rounded-l-lg",
            { "bg-zinc-400 font-medium": !preview },
            { "hover:bg-zinc-400/50": preview },
            {"rounded-none!": isSticky}
          )}
        >
          Edit
          <EditDocument fontSize="small" />
        </div>

        {/* Preview */}
        <div
          onClick={() => setPreview(true)}
          className={clsx(
            "cursor-pointer bg-transparent p-2 w-full flex gap-2 items-center justify-center md:rounded-r-lg",
            { "bg-zinc-400 font-medium": preview },
            { "hover:bg-zinc-400/50": !preview },
            {"rounded-none!": isSticky}
          )}
        >
          Preview
          <Preview fontSize="small" />
        </div>
      </div>
    </>
  );
}