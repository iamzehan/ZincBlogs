import { Router } from "express";
import { ensureAuthor, requireAuth } from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/profile.controller.js";
const router = Router();

router.put("/profile", requireAuth, ensureAuthor, controller.profilePUT);

router.get("/profile/me", requireAuth, controller.profileMeGET);

export default router;