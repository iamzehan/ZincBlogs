import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email | ZincBlogs",
    html: `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#111827,#2563eb); padding:30px; text-align:center;">
        <h1 style="color:#ffffff; margin:0; font-size:22px;">
          ZincBlogs
        </h1>
        <p style="color:#cbd5e1; margin:8px 0 0;">
          Verify your email address
        </p>
      </div>

      <!-- Body -->
      <div style="padding:30px; color:#111827;">
        <h2 style="margin-top:0;">Almost there 👋</h2>

        <p style="font-size:15px; line-height:1.6; color:#374151;">
          Thanks for signing up. Please verify your email address to activate your account and start using ZincBlogs.
        </p>

        <!-- Button -->
        <div style="text-align:center; margin:30px 0;">
          <a href="${link}"
             style="background:#2563eb; color:#ffffff; padding:12px 24px;
                    text-decoration:none; border-radius:8px; display:inline-block;
                    font-weight:bold;">
            Verify Email
          </a>
        </div>

        <p style="font-size:13px; color:#6b7280; line-height:1.5;">
          If the button doesn’t work, copy and paste this link:
        </p>

        <p style="font-size:12px; word-break:break-all; color:#2563eb;">
          ${link}
        </p>

        <hr style="border:none; border-top:1px solid #e5e7eb; margin:25px 0;" />

        <p style="font-size:12px; color:#9ca3af;">
          This link will expire in <b>10 minutes</b>. If you didn’t request this, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
        © ${new Date().getFullYear()} ZincBlogs. All rights reserved.
      </div>

    </div>
  </div>
`
  });
};
