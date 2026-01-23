import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { ensureGuest } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", ensureGuest, register);
router.post("/login", ensureGuest, login);

export default router;