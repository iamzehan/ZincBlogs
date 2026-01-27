import { Router } from "express";
import { login, register } from "../controllers/subs.auth.controller.js";
import { ensureGuest } from "../middlewares/auth.middleware.js";
import { verify } from "../middlewares/verification.middleware.js";

const router = Router();

router.post("/register", ensureGuest, verify);
router.post("/verify-email", register)
router.post("/login", ensureGuest, login);

export default router;