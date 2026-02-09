import { createContext } from "react";
import { useAuth } from "./hooks";
import { fetchRefresh } from "./requests.auth";

interface FetchOptions {
  accessToken?: string | null;
  id?: string | null;
  publish ?: boolean | false;
  body?: {
    title: string;
    content: string;
    tags: string[];
  };
}

interface BlogContextType {
  fetchWithAuth: (
    fetchFn: (options: FetchOptions) => Promise<Response>,
    options: FetchOptions,
  ) => Promise<unknown>;
}

interface BlogProviderProps {
  children: React.ReactNode;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const { setAccessToken } = useAuth();

  async function fetchWithAuth<T>(
    fetchFn: (options: FetchOptions) => Promise<Response>,
    options: FetchOptions,
  ): Promise<T> {
    let res = await fetchFn(options);

    if (res.ok) {
      return res.json();
    }

    if (res.status !== 401) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    // refresh token
    const refreshRes = await fetchRefresh();
    if (!refreshRes.ok) {
      throw new Error("Token refresh failed");
    }

    const { accessToken }: { accessToken: string } = await refreshRes.json();
    setAccessToken(accessToken);

    // retry with new token (NO mutation)
    res = await fetchFn({
      ...options,
      accessToken,
    });

    if (!res.ok) {
      throw new Error(`Retry failed with status ${res.status}`);
    }

    return res.json();
  }

  const value: BlogContextType = {
    fetchWithAuth,
  };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContext;
