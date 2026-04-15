
import { env } from "../config/env";

export const fetchAllBlogs = async (
) => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/blog/posts/published`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
};


// the following function will get a blog
export const fetchOneBlog = async (id: string)=> {
  const res = await fetch(
    `
    ${env.VITE_BACKEND_URL}/api/blog/posts/${id}`,
    {
      method: "GET",
    },
  );
  if (!res.ok) throw new Error("Failed to get Blog");
  return res.json();
};


export interface CreateCommentOptions {
  blogId: string;
  content: string;
  accessToken: string;
}

export const commentPOST = async (options: CreateCommentOptions) : Promise<Response> => {
  const res = await fetch(
    `
    ${env.VITE_BACKEND_URL}/api/blog/posts/${options.blogId}/comment`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({content: options.content})
    },
  );
  return res;
}


// like/ unlike a post
export interface LikeOptions {
  blogId: string | undefined;
  like : boolean;
  accessToken: string | null;
}
export const likePUT = async (options: LikeOptions) : Promise<Response> => {
  const res = await fetch(
    `
    ${env.VITE_BACKEND_URL}/api/blog/posts/${options.blogId}/react?like=${options.like}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
        "Content-Type": "application/json; charset=UTF-8"
      }
    }
  );
  return res;
}

export const verifyLike = async (accessToken: string | null, blogId: string | undefined) => {
  const res = await fetch(
    `
    ${env.VITE_BACKEND_URL}/api/blog/posts/${blogId}/react`,
    {
      method: "GET",
      credentials: "include", 
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8"
      }
    }
  );
  return res.json();
}