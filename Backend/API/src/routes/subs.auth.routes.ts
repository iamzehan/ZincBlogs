import { Router } from "express";
import {
  login,
  profileMeGET,
  register
} from "../controllers/subs.auth.controller.js";
import { ensureGuest, requireAuth } from "../middlewares/auth.middleware.js";
import { verify } from "../middlewares/verification.middleware.js";
import { logout } from "../controllers/logout.controller.js";

const router = Router();

router.post("/register", ensureGuest, verify);
router.post("/verify-email", register);
router.post("/login", ensureGuest, login);
router.post("/logout", logout);
router.get("/profile/me", requireAuth, profileMeGET);
export default router;
