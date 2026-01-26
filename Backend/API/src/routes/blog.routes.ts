import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/blog.controller.js";
const routes = Router();

// get all blog titles (useful for sidebar navigation)
routes.get("/titles", controller.allBlogsTitleGET)

// get all blog posts
routes.get("/posts", controller.allBlogsGET);
// get one blog
routes.get("/posts/:id", controller.findOneBlogGET);
// update a blog post
routes.put("/posts/:id", requireAuth, controller.updateOneBlogPUT);
// delete a blog post
routes.delete("/posts/:id", requireAuth, controller.deleteBlogDELETE);

// create a blog post
routes.post("/create", requireAuth, controller.createBlogPOST);

export default routes;