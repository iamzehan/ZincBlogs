import { env } from "../config/env";
interface RegisterPayload {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await fetch(`${env.VITE_BACKEND_URL}/api/subscribe/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to register");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Register error:", err);
    throw err;
  }
}


interface AccessTokenType {
    accessToken: string;
}
export const fetchProfile = async (data: AccessTokenType) => {
  const meRes = await fetch(`${env.VITE_BACKEND_URL}/api/subscribe/profile/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  });
  return meRes;
};

interface LoginCredentials {
  email: string;
  password: string;
}

export const fetchLogin = async (credentials: LoginCredentials) => {
  const loginRes = await fetch(`${env.VITE_BACKEND_URL}/api/subscribe/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  });
  return loginRes;
};

export const fetchRefresh = async () => {
  const refreshRes = await fetch(`${env.VITE_BACKEND_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include", // 🔑 important for HttpOnly cookies
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return refreshRes;
};

export const fetchLogout = async () => {
    await fetch(`${env.VITE_BACKEND_URL}/api/subscribe/logout`, {
            method: "POST",
            credentials: "include",
          });
}