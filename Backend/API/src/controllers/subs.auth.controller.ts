import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
import { hashToken } from "../utils/token.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token)
      return res.status(400).json({ message: "Token required to varify" });

    const tokenHash = hashToken(token);
    // find valid token
    const record = await prisma.emailToken.findFirst({
      where: {
        tokenHash,
        expiresAt: { gt: new Date() }
      },
      include: {
        pending: true
      }
    });
    if (!record)
      return res.status(400).json({ message: "Invalid or expired token" });

    const user = await prisma.$transaction(async (prismaTx) => {
      const user = await prismaTx.subscriber.create({
        data: {
          username: record.pending.username,
          email: record.pending.email,
          firstName: record.pending.firstName,
          lastName: record.pending.lastName,
          password: record.pending.password,
          isVarified: true
        }
      });
      await prismaTx.pendingUser.delete({
        where: {id: record.pendingId}
      });

      return user;
    });

    res.status(201).json({ id: user.id });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.subscriber.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  req.session.userId = user.id;
  req.session.refreshToken = refreshToken;

  res.json({ accessToken });
};
