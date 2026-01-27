import cron from "node-cron"
import { prisma } from "../config/prisma.js"

cron.schedule("*/10 * * * *", async () => {
  try {
    const deleted = await prisma.emailToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() }
      }
    })

    if (deleted.count > 0) {
      console.log(`Deleted ${deleted.count} expired tokens`)
    }
  } catch (err) {
    console.error("Token cleanup error:", err)
  }
});