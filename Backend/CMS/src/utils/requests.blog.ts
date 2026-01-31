"use server";
import { env } from "../config/env";

interface FetchOptions{
    accessToken?:string | null; 
    id?: string | null;
    publish?:boolean | null;
}

// the following function is responsible for getting all the blogs published/unpublished
export const fetchAllBlogs = async (options: FetchOptions):Promise<Response> => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/blog/posts`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${options.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res;
};

// the following function is responsible for publishing and unpublishing blogs
export const publishBlog = async (options: FetchOptions): Promise<Response> => {
  const res = await fetch(`
    ${env.VITE_BACKEND_URL}/api/blog/posts/${options.id}/publish?status=${options.publish}`,{
    method: "PUT",
    credentials: "include",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${options.accessToken}`
    }
  } 
  );
  if(!res.ok) throw new Error("Failed to publish blog");
  return res;
}