import { Router } from "express";
import * as controller from "../controllers/subs.controller.js";
import { ensureAuthor, requireAuth } from "../middlewares/auth.middleware.js";
const router = Router();

// get list of subscribers
router.get("/", requireAuth, ensureAuthor, controller.subscribersGET);

export default router;