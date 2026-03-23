import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishBlog } from "./requests.blog";
import { deleteImage } from "./requests.media";
import { uploadImage } from "./requests.media";

import { useAuth, useBlog, useMedia } from "./hooks";

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
    mutationFn: ({ id, publish }: { id: string; publish: boolean }) =>
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
    },
  });
}

// This mutation allows us to stop image fetching query and delete an image
export function useDeleteMutation() {
  // get access token
  const { accessToken } = useAuth();
  //   useBlog hook to fetch
  const { fetchWithAuth } = useMedia();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (public_id: string) =>
      fetchWithAuth(deleteImage, { accessToken, public_id }),

    onMutate: async (public_id) => {
      await queryClient.cancelQueries({ queryKey: ["imageData"] });

      const previous = queryClient.getQueryData(["imageData"]);

      queryClient.setQueryData(["imageData"], (old: ImageDataType[]) =>
        old?.filter((img) => img.public_id !== public_id),
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["imageData"], context?.previous);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imageData"] });
    },
  });
}

export function useUploadMutation() {
  const { accessToken } = useAuth();
  const { fetchWithAuth } = useMedia();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      return fetchWithAuth(uploadImage, {
        accessToken,
        file
      });
    },

    // Optimistic update
    onMutate: async (file) => {
      await queryClient.cancelQueries({ queryKey: ["imageData"] });

      const previous = queryClient.getQueryData<ImageDataType[]>(["imageData"]);

      // temporary preview (VERY important for UX)
      const tempId = `temp-${Date.now()}`;
      const previewURL = URL.createObjectURL(file);

      queryClient.setQueryData(["imageData"], (old: ImageDataType[]) => [
        {
          public_id: tempId,
          url: previewURL,
          isUploading: true, // optional flag
        },
        ...old,
      ]);

      return { previous, tempId };
    },

    // Rollback on failure
    onError: (_err, _file, context) => {
      queryClient.setQueryData(["imageData"], context?.previous);
    },

    // Replace temp with real data
    onSuccess: (data, _file, context) => {
      queryClient.setQueryData(["imageData"], (old : ImageDataType[]) =>
        old.map((img) =>
          img.public_id === context?.tempId ? data : img
        )
      );
    },

    // Final sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["imageData"] });
    },
  });
}