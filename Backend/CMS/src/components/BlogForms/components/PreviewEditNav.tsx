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
          "sticky top-18 w-full md:w-auto md:ml-14 justify-self-center flex md:rounded-lg border-b-zinc-600/0 bg-zinc-900 transition-all duration-200"
        ,
        "transition-all duration-500 ease-in-out",
        {
          "md:w-[80vw]! w-full rounded-none! [>*]:rounded-none!": isSticky
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