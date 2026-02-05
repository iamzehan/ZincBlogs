import {prisma} from '../config/prisma.js';
import { Request, Response } from 'express';
export const getAllTags = async (req:Request, res:Response) => {
    try{
    const tags = await prisma.tags.findMany();
    res.status(200).json(tags.map(tags=> tags.tag));
    }catch{
        res.status(401).json({message: "No tags found!"});
    }
}