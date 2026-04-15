import NameAvatar from "./NameAvatar";
import { formatDate } from "../utils/helpers";

interface CommentOwner {
  username: string;
  firstName: string;
  lastName: string;
}

interface Comment {
  owner: CommentOwner;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  ref: React.RefObject<null> | (()=> void);
  comments: Comment[];
}

export default function Comments({ ref , comments }: CommentsProps) {
  if (!comments || comments.length === 0) {
    return (
      <div className="mt-8 text-zinc-400 text-center mb-10 border border-zinc-500/20 w-[90vw] rounded-lg max-w-3xl p-5">
        No comments yet. Be the first to comment!
      </div>
    );
  }


  return (
    <div ref={ref} className="space-y-2 mt-8 pb-10 max-w-3xl text-left px-2 md:px-0 w-full">
      {comments.map((c, idx) => (
        <div
          key={idx}
          className="flex gap-4 p-5 bg-zinc-900/50 md:rounded-xl shadow-md shadow-zinc-900/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-shadow duration-300"
        >
          {/* Avatar placeholder */}
          <NameAvatar props={{user:c.owner}}/>
          <div className="flex-1">
            <div className="flex md:items-center gap-2 mb-1">

              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <p className="font-semibold text-zinc-100">
                  {c.owner.firstName} {c.owner.lastName}
                </p>
                <p className="text-blue-400 text-sm">@{c.owner.username}</p>
              </div>
              <p className="text-zinc-500 text-sm ml-auto">{formatDate(c.createdAt)}</p>
            </div>
            <p className="text-zinc-300">{c.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}