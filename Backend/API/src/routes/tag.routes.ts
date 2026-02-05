import { Router } from "express";
import { requireAuth, ensureAuthor, ensureCommentOwner } from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/tags.controller.js";
const routes = Router();

routes.get("/", requireAuth, ensureAuthor, controller.getAllTags);

export default routes;