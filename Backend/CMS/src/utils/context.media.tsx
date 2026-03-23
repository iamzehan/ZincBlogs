import { createContext, useState } from "react";
import { useAuth } from "./hooks";
import { fetchRefresh } from "./requests.auth";

interface FetchOptions {
  accessToken?: string | null;
  public_id?: string | null;
  file ? : File;
}

interface MediaContextType {
  fetchWithAuth: (
    fetchFn: (options: FetchOptions) => Promise<Response>,
    options: FetchOptions,
  ) => Promise<unknown>;
  imgURL: string | null;
  setImgURL: React.Dispatch<React.SetStateAction<string | null>>;
}

interface MediaProviderProps {
  children: React.ReactNode;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider = ({ children }: MediaProviderProps) => {
  const { setAccessToken } = useAuth();
  const [ imgURL, setImgURL ] = useState<string | null>(null)

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

  const value: MediaContextType = {
    fetchWithAuth,
    imgURL,
    setImgURL
  };
  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

export default MediaContext;
