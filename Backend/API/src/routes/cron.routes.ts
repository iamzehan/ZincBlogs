import { Router } from "express";
import { prisma } from "../config/prisma.js";

const router = Router();

router.get("/cleanup-tokens", async (req, res) => {
  try {
    const deleted = await prisma.emailToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() }
      }
    });

    res.json({
      success: true,
      deleted: deleted.count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

export default router;