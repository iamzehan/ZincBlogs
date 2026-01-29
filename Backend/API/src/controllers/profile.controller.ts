import { prisma } from "../config/prisma.js";
import { Request, Response } from "express";
import { parameterIDProcessor } from "../utils/processors.js";

// ======================== CREATE or Update A PROFILE ======================== //

export const profilePUT = async (req: Request, res: Response) => {
  try {
    const { username, firstName, lastName } = req.body;
    const profile = await prisma.profile.upsert({
      where: { authorId: req.userId },
      update: {},
      create: {
        username,
        firstName,
        lastName,
        authorId: req.userId || ""
      }
    });
    res.status(201).json({ message: "Profile added!" });
  } catch (err) {
    res.status(500).json({ message: "Could not create or update profile!" });
  }
};


export const profileMeGET = async (req: Request, res: Response) => {

    try{
        const profile = await prisma.profile.findUnique(
          {
            select:{username:true, firstName:true, lastName:true},
            where: {
              authorId: req.userId
            }
          }
        )
        res.status(200).json(profile);
    }catch(err){
      console.error(err);
      res.status(500).json({message: "Could not find profile"});
    }
}