import { Router } from "express";
import authRoutes from "./auth.routes.js";
import blogRoutes from "./blog.routes.js";
import profileRoutes from "./profile.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);
router.use("/author", profileRoutes)

export default router;