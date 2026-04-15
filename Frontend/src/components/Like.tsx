import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuth, useIsMobile } from "../utils/hooks";
import { verifyLike } from "../utils/requests.blog";
import type { UseMutateFunction } from "@tanstack/react-query";

export default function Like({
  likesCount = 0,
  addLike,
}: {
  likesCount?: number;
  addLike: UseMutateFunction<Response, Error, boolean, unknown>;
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likesCount);

  const isMobile = useIsMobile();

  const location = useLocation();
  const { accessToken, isAuthenticated, setLoginPrompt, setLastPage } =
    useAuth();
  const { id } = useParams<string>();

  const handleLike = () => {
    if (!isAuthenticated) {
      setLoginPrompt(true);
      setLastPage(location.pathname);
      return;
    }

    const nextLiked = !liked;

    setCount((c) => (nextLiked ? c + 1 : c - 1));
    setLiked(nextLiked);

    addLike(nextLiked, {
      onError: () => {
        setCount((c) => (nextLiked ? c - 1 : c + 1));
        setLiked(!nextLiked);
      },
    });
  };

  useEffect(() => {
    const verify = async () => {
      try {
        const userLiked = await verifyLike(accessToken, id);
        setLiked(userLiked.liked);
      } catch {
        setLiked(false);
      }
    };

    if (isAuthenticated && id) verify();
  }, [isAuthenticated, id, accessToken]);

  return (
    <button
      title={liked ? "Unlike" : "Like"}
      onClick={handleLike}
      className={`
        group relative flex items-center justify-center
        gap-2 px-4 py-3
        rounded-[inherit]
        transition-all duration-200 ease-out
        hover:bg-zinc-800/50
        active:scale-[0.96]
        ${liked ? "bg-zinc-800/60" : "bg-transparent"}
      `}
    >
      {/* ICON WRAPPER */}
      <div
        className={`
  flex items-center justify-center
  w-9 h-9 rounded-lg
  transition-all duration-200
  bg-zinc-800/60
  text-zinc-400
  group-hover:bg-zinc-800
  group-hover:text-zinc-200
  ${liked ? "text-red-400 bg-zinc-800/80" : ""}
`}
      >
        {liked ? (
          <Favorite fontSize="small" className="text-red-500" />
        ) : (
          <FavoriteBorder fontSize="small" />
        )}
      </div>

      {/* LABEL */}
      {!isMobile && (
        <span
          className={`
            text-sm font-medium
            transition-colors duration-200
            ${liked ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}
          `}
        >
          {liked? "Liked" : "Likes"}
        </span>
      )}

      {/* COUNT */}
      <span
        className={`
          ml-1
          min-w-6 h-6 px-2
          flex items-center justify-center
          rounded-full
          text-[11px] font-semibold
          transition-all duration-200
          border
          ${
            liked
              ? "bg-white/20 text-white border-white/20 shadow-sm"
              : "bg-zinc-800 text-zinc-200 border-zinc-700 group-hover:border-zinc-500"
          }
        `}
      >
        {count}
      </span>

      {/* ACTIVE INDICATOR (matches comment button style) */}
      {liked && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-red-500/80 rounded-full blur-[1px]" />
      )}
    </button>
  );
}
