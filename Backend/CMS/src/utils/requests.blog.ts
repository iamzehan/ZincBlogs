"use server";
import { env } from "../config/env";

interface FetchOptions{
    accessToken?:string | null; 
    id?: number | null;
    publish?:boolean | null;
}

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
