import { Request, Response } from "express";
import { env } from "../config/env.js";

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destroy error:", err);
      return res.sendStatus(500);
    }

    // Clear refresh token cookie (must match path + flags)
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "development" ? "lax" : "none",
      path: "/api/auth/refresh", // must match where cookie was set
    });

    // Optional: clear session cookie if using express-session
    res.clearCookie("sid", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "development" ? "lax" : "none",
      path: "/",
    });

    return res.sendStatus(204); // ✅ important — send response
  });
};
