import { Router, Request, Response } from "express";
import multer from "multer";
import { ensureAuthor } from "../middlewares/auth.middleware.js";
import * as cloud from "../middlewares/cloudinary.middleware.js";
import * as controller from "../controllers/image.controller.js";
const uploadImageRouter = Router();
const upload = multer(); // memory storage

// image upload route
uploadImageRouter.post(
  "/upload",
  ensureAuthor,
  upload.single("image_file"),
  cloud.uploadImage, // uploads image to cloud
  controller.insertImageToDB // inserts image info in the database
);

// Image delete route
uploadImageRouter.post(
  "/delete",
  ensureAuthor,
  cloud.deleteImage, // deletes image from cloud
  controller.deleteImageFromDB
);

export default uploadImageRouter;
