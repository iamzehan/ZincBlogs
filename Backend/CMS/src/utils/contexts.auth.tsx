import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { env } from "../config/env";
/* =======================
   Types
======================= */

export interface User {
  id: string;
  email: string;
  role?: string;
  // add more fields from /auth/me if needed
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

/* =======================
   Context
======================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =======================
   Provider
======================= */

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* 🔁 Restore session on app load */
  useEffect(() => {
    const restoreSession = async () => {
      try {
        // Refresh token via cookie
        const refreshRes = await fetch(`${env.VITE_BACKEND_URL}/api/auth/refresh`, {
          method: "POST",
          credentials:"include", // 🔑 important for HttpOnly cookies
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });

        if (!refreshRes.ok) throw new Error("Refresh failed");

        const refreshData: { accessToken: string } = await refreshRes.json();
        setAccessToken(refreshData.accessToken);

        // // Fetch user profile
        // const meRes = await fetch("/auth/me", {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${refreshData.accessToken}`,
        //   },
        // });

        // if (!meRes.ok) throw new Error("User fetch failed");

        // const meData: User = await meRes.json();
        // setUser(meData);
      } catch (err) {
        console.log(err)
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

//  ------------------------------------ LOGIN USER ----------------------------------- //
  const login = async (credentials: LoginCredentials): Promise<void> => {
    const loginRes = await fetch(`${env.VITE_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(credentials),
    });

    if (!loginRes.ok) {
      throw new Error("Login failed");
    }

    const loginData: { accessToken: string } = await loginRes.json();
    setAccessToken(loginData.accessToken);
    // // Fetch user
    // const meRes = await fetch("/auth/me", {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${loginData.accessToken}`,
    //   },
    // });

    // if (!meRes.ok) {
    //   throw new Error("User fetch failed");
    // }

    // const meData: User = await meRes.json();
    // setUser(meData);
  };

  /* Logout */
  const logout = async () => {
    try {
      await fetch(`${env.VITE_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
        setAccessToken(null);
        setUser(null);
    } catch {
      // ignore network errors
    }
    
    
  };

  const value: AuthContextType = {
    accessToken,
    user,
    loading,
    isAuthenticated: !!accessToken,
    login,
    logout,
    setAccessToken,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


export default AuthContext;