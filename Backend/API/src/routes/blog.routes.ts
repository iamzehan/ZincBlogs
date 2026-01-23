import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/blog.controller.js";
const routes = Router();

// get all blog posts
//routes.get("/posts", controller.allBlogsGET);

// create a blog post
routes.post("/create", requireAuth, controller.createBlogPOST);

export default routes;