import { Router, Request, Response, NextFunction } from "express";
import cloudinary, { UploadApiResponse } from "../config/cloudinary.js";
import streamifier from "streamifier";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadImage = async (req: MulterRequest, res:Response, next:NextFunction) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Validate file type
    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "Invalid file type" });
    }
    // get the result
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "projects" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });

    // Add the url for the next controller
    req.url = result.secure_url;
    // go to the next controller
    next();

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cloudinary upload failed" });
  }
}


// uploaded image delete route
interface DeleteThumbnailRequest extends Request {
  body: {
    public_id: string;
  };
}

export const deleteImage = async (req: DeleteThumbnailRequest, res: Response, next: NextFunction) => {
    try {
      const { public_id } = req.body;
      if (!public_id)
        return res.status(400).json({ error: "No public_id provided" });

      await cloudinary.uploader.destroy(public_id);
      
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Cloudinary deletion failed" });
    }
  }