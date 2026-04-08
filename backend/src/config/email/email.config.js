import nodemailer from "nodemailer";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";

dotenv.config({ path: envFile });

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Dynamic sender info
export const getSenderInfo = () => ({
  name: process.env.EMAIL_SENDER_NAME || "Job Aspirations",
  email: process.env.SMTP_USER,
});
