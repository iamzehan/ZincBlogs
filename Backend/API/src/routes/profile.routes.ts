import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/profile.controller.js";
const router = Router();

router.put("/profile", requireAuth, controller.profilePUT);

router.get("/profile/:id", controller.profileGET);

export default router;