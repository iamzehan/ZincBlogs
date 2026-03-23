"use server";
import { env } from "../config/env";

interface FetchOptions {
  accessToken?: string | null;
  public_id?: string | null;
  file?: File;
}

// the following function fetches all the images from cloud

export const getAllImages = async (
  options: FetchOptions,
): Promise<Response> => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/files/images/all`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${options.accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch Images");
  }
  return res;
};

// the following deletes an image from cloud and database

export const deleteImage = async (options: FetchOptions): Promise<Response> => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/files/images/delete`, {
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${options.accessToken}`,

      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ public_id: options.public_id }),
  });
  if (!res.ok) throw new Error("Failed to delete Image");
  return res;
};

// Image upload request

export const uploadImage = async (options: FetchOptions): Promise<Response> => {
  const formData = new FormData();
  const { file } = options;
  formData.append("image_file", file);

  const res = await fetch(`${env.VITE_BACKEND_URL}/api/files/images/upload`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${options.accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");

  return res;
};
