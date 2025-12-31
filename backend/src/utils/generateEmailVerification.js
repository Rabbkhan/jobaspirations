import crypto from "crypto";

export const generateEmailVerification = async (user) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const hashed = crypto
    .createHash("sha256")
    .update(code)
    .digest("hex");

  user.verificationCode = hashed;
  user.emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 min
  user.verificationAttempts = 0;

  await user.save();
  return code; // plain code for email
};
