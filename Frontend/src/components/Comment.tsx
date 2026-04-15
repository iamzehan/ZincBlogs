import { useState, useRef, useEffect } from "react";
import { AccountCircle, Send } from "@mui/icons-material";
import NameAvatar from "./NameAvatar";
import { useAuth, useIsMobile } from "../utils/hooks";

interface PropsType {
  commentId?: string | null;
  comment?: string | null;
  onSubmit: (content: string) => void;
}

export default function Comment({ props }: { props: PropsType }) {
  const { commentId, comment, onSubmit } = props;
  const isMobile  = useIsMobile();
  const [text, setText] = useState(comment || "");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { user, isAuthenticated, setLoginPrompt } = useAuth();
  // Auto-expand textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [text]);

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <div
      className={`
  w-full max-w-3xl py-5 px-2 md:p-5 md:rounded-lg bg-zinc-900/60
  ${isMobile? "fixed bottom-0 bg-zinc-900! w-screen!" : "static"}
`}
    >
      <form className="w-full flex gap-3 items-start" onSubmit={handleSubmit}>
        {/* Hidden comment ID (for edit/reply cases) */}

        {commentId && (
          <input type="hidden" name="commentId" value={commentId} />
        )}

        {user && (
          <input type="hidden" name="userId" id="userId" value={user.id} />
        )}

        {/* Avatar/Icon */}
        {isAuthenticated ? (
          <NameAvatar props={{ user }} />
        ) : (
          <AccountCircle fontSize="large" className="text-zinc-500" />
        )}
        {/* Input + Button wrapper */}
        <div className="flex-1 flex gap-2 items-center">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            name="comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            placeholder="Add a comment..."
            className="
            w-full resize-none
            px-3 py-2 rounded-lg
            bg-zinc-800/80 border border-zinc-700
            text-sm text-zinc-100
            focus:outline-none focus:ring-2 focus:ring-zinc-500/40
            placeholder:text-zinc-500
            transition-all
            overflow-hidden
            "
            onFocus={() => {
              if (!isAuthenticated) {
                setLoginPrompt(true);
              }
            }}
          />

          {/* Submit */}
          <div className="flex justify-end items-end ">
            <button
              title="Post Comment"
              disabled={!isAuthenticated}
              type="submit"
              className="flex flex-row-reverse h-fit items-center gap-2 disabled:cursor-not-allowed disabled:bg-zinc-500 bg-white px-3 py-2 md:py-1.5 rounded-lg text-black hover:bg-zinc-100 transition"
            >
              <Send fontSize="small" />
              <span className="hidden md:block">Comment</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
