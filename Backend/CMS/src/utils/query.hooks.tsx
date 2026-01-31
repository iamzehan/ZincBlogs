import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishBlog } from "./requests.blog";
import { useAuth, useBlog } from "./hooks";

// This mutation hook stops the parent query that gets blog data and lets through the publish blog query
export function useTogglePublish() {
// get access token
  const { accessToken } = useAuth();
//   useBlog hook to fetch
  const { fetchWithAuth } = useBlog();
// use Query client to mutate
  const queryClient = useQueryClient();
// return useMutation hook to access it's property as a callback
  return useMutation({
    // defines the mutation function (API call runs when mutate() is called)
    mutationFn: 
    ({ id, publish }: { id: string; publish: boolean }) =>
    fetchWithAuth(publishBlog, { id, publish, accessToken }),

    // cancel any in-flight refetches for this query to avoid overwriting optimistic data
    onMutate: async ({ id, publish }) => {
      await queryClient.cancelQueries({ queryKey: ["blogData"] });
      
    //   record the previous query data
      const previous = queryClient.getQueryData<Blog[]>(["blogData"]);

    // optimistically update the cached query data (client-side only)
      queryClient.setQueryData<Blog[]>(["blogData"], (old) =>
        old?.map((blog) =>
          blog.id === id
            ? { ...blog, publish: { ...blog.publish, status: publish } }
            : blog,
        ),
      );
    // return previous data so it can be used for rollback if the mutation fails
      return { previous };
    },
    // if mutation function fails then set data as previous
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["blogData"], ctx?.previous);
    },
    // when it succeeds mark as stale
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogData"] });
    }
  });
}

// ======================== This was a hell of a study I had done in 2 hours ============================= //