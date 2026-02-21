import { prisma } from "../config/prisma.js";
import { Request, Response } from "express";
import { getPublicIdFromUrl } from "../utils/cloudinary-helpers.js";

// ============================= INSERT THE UPLOADED IMAGE INFO ==============================//
export const insertImageToDB = async (req: Request, res: Response) => {
  try {
    const url = req.url;
    const public_id = getPublicIdFromUrl(url);
    const filename = req.file?.filename;

    await prisma.images.create({
      data: {
        url,
        public_id,
        filename: filename || ""
      }
    });

    res.status(200).json({ message: "Image uploaded!" });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =============================== DELETE IMAGE INFO ====================================== //
export const deleteImageFromDB = async (req: Request, res: Response) => {
  try {
    const { public_id } = req.body;
    await prisma.images.delete({
      where: {
        public_id
      }
    });
    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
