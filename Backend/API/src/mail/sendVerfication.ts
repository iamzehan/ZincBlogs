import { transporter } from "./transporter.js";
import { env } from "../config/env.js";

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${env.CLIENT_URL}/api/subscribe/verify-email?token=${token}`

  await transporter.sendMail({
    from: env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Verify your account</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${link}">Verify Email</a>
      <p>This link expires in 10 minutes.</p>
    `
  })
}
