import { Comment } from "@mui/icons-material";
import { useIsMobile } from "../utils/hooks";

interface Types {
  showComment: boolean;
  handleComment: () => void;
  commentCount: number;
}

export default function CommentBtn({ props }: { props: Types }) {
  const { handleComment, showComment, commentCount } = props;
  const isMobile = useIsMobile();

  return (
    <button
      title={showComment ? "Hide Comments" : "Show Comments"}
      onClick={handleComment}
      className={`
        group relative flex items-center justify-center
        gap-2 px-4 py-3
        rounded-[inherit]
        transition-all duration-200 ease-out
        hover:bg-zinc-800/50
        active:scale-[0.96]
        ${showComment ? "bg-zinc-800/60" : "bg-transparent"}
      `}
    >
      {/* ICON */}
      <div
        className={`
          flex items-center justify-center
          w-9 h-9 rounded-lg
          transition-all duration-200
          ${showComment
            ? "bg-white text-black shadow-sm"
            : "bg-zinc-800 text-zinc-400 group-hover:text-zinc-200"}
        `}
      >
        <Comment fontSize="small" />
      </div>

      {/* LABEL */}
      {!isMobile && (
        <span
          className={`
            text-sm font-medium
            transition-colors duration-200
            ${showComment ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}
          `}
        >
          Comments
        </span>
      )}

      {/* BADGE */}
      <div
        className={`
          ml-1
          min-w-6 h-6 px-2
          flex items-center justify-center
          rounded-full
          text-[11px] font-semibold
          transition-all duration-200
          border
          ${
            showComment
              ? "bg-white text-black border-white shadow-sm"
              : "bg-zinc-800 text-zinc-200 border-zinc-700 group-hover:border-zinc-500"
          }
        `}
      >
        {commentCount}
      </div>

      {/* ACTIVE INDICATOR */}
      {showComment && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-500/80 rounded-full blur-[1px]" />
      )}
    </button>
  );
}