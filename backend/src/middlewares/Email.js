import { passwordResetEmailTemplate, verificationEmailTemplate, welcomeEmailTemplate } from "../libs/Emailtemplates.js";
import { transporter, getSenderInfo } from "./email.config.middleware.js";

export const sendVerificationCode = async (email, verificationCode, userName) => {
  try {
    const sender = getSenderInfo();

    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Your Email Verification Code",
      text: `Your verification code is: ${verificationCode}`,
      html: verificationEmailTemplate(userName, verificationCode)
    });

    return true;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return false;
  }
};

export const sendWelcomeEmail = async (email, userName) => {
  try {
    const sender = getSenderInfo();

    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Welcome Back to Job Aspirations",
      text: `Welcome back ${userName}, we're glad to see you again.`,
      html: welcomeEmailTemplate(userName)
    });

    return true;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
};


export const sendPasswordResetEmail = async ({
  to,
  resetLink,
  userName,
}) => {
  try {
    if (!to) {
      throw new Error("Email recipient is missing");
    }

    const sender = getSenderInfo();
    
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to,
      subject: "Reset Your Password",
      text: `Reset your password using this link: ${resetLink}`,
      html: passwordResetEmailTemplate(userName, resetLink),
    });

    return true;
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
};
