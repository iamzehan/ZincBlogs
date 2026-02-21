import { Router } from "express";
import authRoutes from "./auth.routes.js";
import blogRoutes from "./blog.routes.js";
import profileRoutes from "./profile.routes.js";
import subscriberAuthRoutes from "./subs.auth.routes.js";
import tagRoutes from "./tag.routes.js";
import subscribersRoutes from "./subs.routes.js";
import uploadImageRouter from "./upload.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);
router.use("/author", profileRoutes);
router.use("/subscribe", subscriberAuthRoutes);
router.use("/tags", tagRoutes);
router.use("/subscribers", subscribersRoutes);
router.use("/files/images", uploadImageRouter);

export default router;