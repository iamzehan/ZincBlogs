
import {prisma} from "../config/prisma.js";
import { sendVerificationEmail } from "../mail/sendVerfication.js";
import { Request, Response, NextFunction } from "express";
import { hashPassword } from "../utils/password.js";
import { generateToken, hashToken } from "../utils/token.js";

export const verify = async (req:Request, res:Response) => {
    const {username, firstName, lastName, email, password} = req.body;

    // generate email token
    const token = generateToken();
    const tokenHash = hashToken(token);

    try{
        await sendVerificationEmail(email, token)
    }catch(err){
        return res.status(400).json("Verfication failed! Try again.")
    }
    // create pending user
    const pending = await prisma.pendingUser.create({
        data: {
            username,
            email,
            firstName,
            lastName,
            password: await hashPassword(password),
        }
    });

    // store email token
    await prisma.emailToken.create({
        data: {
            pendingId: pending.id,
            tokenHash,
            expiresAt: new Date(Date.now() + 1000 * 60 * 10) // expires in 10 minutes
        }
    });

    return res.status(200).json({
        message: "Check your email to varify your account"
    })
}