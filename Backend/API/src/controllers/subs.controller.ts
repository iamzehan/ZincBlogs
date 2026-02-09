import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const subscribersGET = async (req: Request, res: Response) => {
  try {
    const subscribers = await prisma.subscriber.findMany({
        select: {
            firstName: true,
            lastName: true,
            username: true,
            email: true, 
            isVarified: true,
            createdAt: true
        }
    });
    res.status(200).json(subscribers);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};