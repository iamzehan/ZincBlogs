"use server";
import { env } from "../config/env";
export const fetchAllBlogs = async (accessToken: string) => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/blog/posts`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
};
