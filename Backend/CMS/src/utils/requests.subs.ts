import { env } from "../config/env";

interface FetchOptions {
    accessToken?: string | null;
}

// the following function is responsible for getting all the blogs published/unpublished
export const fetchAllSubscribers = async (
  options: FetchOptions,
): Promise<Response> => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/subscribers`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${options.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch subscribers");
  }
  return res;
};