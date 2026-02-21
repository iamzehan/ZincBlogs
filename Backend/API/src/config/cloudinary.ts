import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { env } from "./env.js";

cloudinary.config({
  cloud_name: env.CL_NAME || "",
  api_key: env.CL_API_KEY || "",
  api_secret: env.CL_API_SECRET || ""
});

export default cloudinary;
export type { UploadApiResponse };
