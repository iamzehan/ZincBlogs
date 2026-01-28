import { Router } from "express";
import { login, register, refresh } from "../controllers/auth.controller.js";
import { ensureAuthor, ensureGuest } from "../middlewares/auth.middleware.js";
import { logout } from "../controllers/logout.controller.js";

const router = Router();

router.post("/register", ensureGuest, register);
router.post("/login", ensureGuest, login);
router.post('/refresh', refresh);
router.post('/logout', logout)
export default router;