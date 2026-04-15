import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchOneBlog } from "../utils/requests.blog";
import BlogBody from "../components/BlogBody";
import { BlogSkeleton } from "../components/Skeletons";
import Comments from "../components/Comments";
import Comment from "../components/Comment";
import { useCreateComment, useLike } from "../utils/query";
import LikeCommentWrapper from "../components/LikeCommentWrapper";
import { useScrollTo } from "../utils/hooks";
import { useState, useEffect } from "react";
import CommentBtn from "../components/CommentBtn";
import Like from "../components/Like";
export default function Page() {
  const { id } = useParams<string>();
  const [showComment, setShowComment] = useState<boolean>(false);
  const [commentsRef, scrollToComments] = useScrollTo();

  useEffect(() => {
    if (showComment) {
      scrollToComments();
    }
  }, [showComment, scrollToComments]);

  const handleComment = () => {
    setShowComment((prev) => !prev);
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchOneBlog(id!),
    enabled: !!id,
  });
  const { mutate: addComment } = useCreateComment(id!);
  const { mutate: addLike } = useLike(id!);

  if (isLoading) {
    return <BlogSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Failed to load blog.
      </div>
    );
  }

  return (
    <main
      className="relative min-h-screen w-screen pb-20
    flex flex-col items-center bg-zinc-950 text-zinc-100 overflow-x-hidden"
    >
      <BlogBody data={data}>
        <LikeCommentWrapper>
          <Like likesCount={data.likes.length} addLike={addLike} />
          <CommentBtn
            props={{
              showComment,
              handleComment,
              commentCount: data.comments.length,
            }}
          />
        </LikeCommentWrapper>
      </BlogBody>

      {showComment && (
        <>
          <h1 className="p-2 mb-2 text-2xl font-bold border-b border-b-zinc-500/20 w-full max-w-3xl text-left">
            Comments
          </h1>

          <Comment props={{ onSubmit: addComment }} />

          <Comments ref={commentsRef} comments={data.comments} />
        </>
      )}
    </main>
  );
}
