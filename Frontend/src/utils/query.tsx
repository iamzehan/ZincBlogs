import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentPOST, likePUT } from "../utils/requests.blog";
import { useAuth } from "./hooks";

export function useCreateComment(blogId: string | undefined) {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (content: string) => {
      if (!blogId || !accessToken) {
        throw new Error("Missing blogId or accessToken");
      }

      return commentPOST({
        blogId,
        content,
        accessToken,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog", blogId],
      });
    },
  });
}

export function useLike(blogId: string | undefined) {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (like: boolean) => {
      if (!blogId || !accessToken) {
        throw new Error("Missing blogId or accessToken");
      }

      return likePUT({
        blogId,
        like,
        accessToken,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog", blogId],
      });
    },
  });
}