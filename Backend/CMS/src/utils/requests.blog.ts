"use server";
import { env } from "../config/env";

interface FetchOptions {
  accessToken?: string | null;
  id?: string | null;
  publish?: boolean | null;
  body?: {
    title: string;
    content: string;
    tags: string[];
  };
}

// the following function is responsible for getting all the blogs published/unpublished
export const fetchAllBlogs = async (
  options: FetchOptions,
): Promise<Response> => {
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
  const res = await fetch(
    `
    ${env.VITE_BACKEND_URL}/api/blog/posts/${options.id}/publish?status=${options.publish}`,
    {
      method: "PUT",
      credentials: "include",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
      },
    },
  );
  if (!res.ok) throw new Error("Failed to publish blog");
  return res;
};

// the following function will update a blog
export const updateBlog = async (options: FetchOptions): Promise<Response> => {
  const res = await fetch(
    `
    ${env.VITE_BACKEND_URL}/api/blog/posts/${options.id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(options.body)
    },
  );
  if (!res.ok) throw new Error("Failed to publishBlog");
  return res;
};

// the following function will get a blog
export const getBlog = async (options: FetchOptions): Promise<Response> => {
  const res = await fetch(
    `
    ${env.VITE_BACKEND_URL}/api/blog/posts/${options.id}`,
    {
      method: "GET",
    },
  );
  if (!res.ok) throw new Error("Failed to get Blog");
  return res;
};

// the following function gets all the tags usable

export const getTags = async (options:FetchOptions): Promise<Response> => {
  const res = await fetch(
    `
    ${env.VITE_BACKEND_URL}/api/tags`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${options.accessToken}`
      }
    },
  );
  if (!res.ok) throw new Error("Failed to get tags");
  return res;
};


// create a blog 
export const createBlog = async (options: FetchOptions) : Promise<Response> => {
  const res = await fetch(
    `
    ${env.VITE_BACKEND_URL}/api/blog/create`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(options.body)
    },
    
  );
  return res;
}