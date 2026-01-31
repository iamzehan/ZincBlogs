import { createContext } from "react";
import { useAuth } from "./hooks";
import { fetchRefresh } from "./requests.auth";

interface FetchOptions{
    accessToken?:string | null; 
    id?: string | null;
    publish?:boolean | null;
}

interface BlogContextType {
  fetchWithAuth: (
    fetchFn: (options:FetchOptions)=> Promise<Response>,
     options:FetchOptions
    ) => Promise<Blog[] | Blog>;
}

interface BlogProviderProps {
  children: React.ReactNode;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const { setAccessToken } = useAuth();

  async function fetchWithAuth( fetchFn: (options:FetchOptions)=> Promise<Response>, options:FetchOptions) {
    try {
      // first fetch
      const res = await fetchFn(options);
      if (res.ok) return res.json(); // No issues then return the data
      // if data fetching failed then refresh token and do it again
      if (res.status === 401) {
        const refreshRes = await fetchRefresh();
        if (!refreshRes.ok) throw new Error("Refresh Failed!");
        const refreshData: { accessToken: string } = await refreshRes.json();
        setAccessToken(refreshData.accessToken);
        // fetch again
        options.accessToken = refreshData.accessToken;
        const res = await fetchFn(options);
        if (res.ok) return res.json();
        else throw new Error("Sorry, couldn't load data");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const value: BlogContextType = {
    fetchWithAuth,
  };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContext;