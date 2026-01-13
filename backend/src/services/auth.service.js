import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/statusCodes.js";
import { sendPasswordResetEmail, sendVerificationCode, sendWelcomeEmail } from "../middlewares/Email.js";
import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import { uploadToCloud } from "../utils/uploadToCloud.js";
import { generateEmailVerification } from "../utils/generateEmailVerification.js";
import crypto from "crypto";
import { FRONTEND_URL } from "../config/env.js";


export const registerUser = async ({ fullname, email, password, phoneNumber, role, profilePhoto }) => {
  fullname = fullname?.trim();
  email = email?.toLowerCase().trim();
  phoneNumber = phoneNumber?.trim();

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashed = await hashPassword(password);

  const allowedRoles = ["student", "recruiter"];
  const userRole = allowedRoles.includes(role) ? role : "student";

  let profilePhotoURL = "";
  if (profilePhoto) profilePhotoURL = await uploadToCloud(profilePhoto, "image");

  // First create the user
  const newUser = await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashed,
    role: userRole,
    profile: {
      profilePhoto: profilePhotoURL,
      bio: "",
      skills: [],
      resume: "",
    },
  });

  if (!newUser) throw new Error("Failed to create user");

  // Then generate verification code
  const code = await generateEmailVerification(newUser);

  // Send code to email
  await sendVerificationCode(email, code, fullname);

  return {
    success: true,
    message: "User registered successfully",
    userId: newUser._id,
  };
};





export const verifyEmailService = async (email, code) => {
  if (!email || !code)
    return {
      status: 400,
      success: false,
      message: "Email and verification code are required",
    };

  email = email.trim().toLowerCase();
  code = code.trim();

  const user = await User.findOne({ email });

  if (!user)
    return { status: 404, success: false, message: "User not found" };

  if (user.isEmailVerified)
    return { status: 400, success: false, message: "Email already verified" };

  if (!user.verificationCode || !user.emailVerificationExpires)
    return {
      status: 400,
      success: false,
      message: "No verification code found. Request a new one.",
    };

  if (user.verificationAttempts >= 5)
    return {
      status: 429,
      success: false,
      message: "Too many failed attempts. Request a new code.",
    };

  if (user.emailVerificationExpires < new Date())
    return {
      status: 400,
      success: false,
      message: "Verification code expired. Request a new one.",
    };

  const hashed = crypto
    .createHash("sha256")
    .update(code)
    .digest("hex");

  if (hashed !== user.verificationCode) {
    user.verificationAttempts += 1;
    await user.save();
    return {
      status: 400,
      success: false,
      message: "Invalid verification code",
    };
  }

  // SUCCESS
  user.isEmailVerified = true;
  user.verificationCode = null;
  user.emailVerificationExpires = null;
  user.verificationAttempts = 0;
  await user.save();

  return {
    status: 200,
    success: true,
    message: "Email verified successfully",
  };
};


export const requestVerificationCodeService = async (email) => {
  email = email.trim().toLowerCase();

  const user = await User.findOne({ email });
  if (!user)
    return { status: 404, success: false, message: "User not found" };

  if (user.isEmailVerified)
    return { status: 400, success: false, message: "Email already verified" };

  const code = await generateEmailVerification(user);

  const sent = await sendVerificationCode(user.email, code, user.fullname);

  if (!sent)
    return {
      status: 500,
      success: false,
      message: "Failed to send verification email",
    };

  return {
    status: 200,
    success: true,
    message: "Verification code sent to email",
  };
};




export const loginUser = async ({ email, password, role }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const err = new Error(MESSAGES.INVALID_CREDENTIALS);
    err.status = 401;
    throw err;
  }

  // CHECK EMAIL VERIFICATION
  if (!user.isEmailVerified) {
    const err = new Error("Please verify your email before logging in");
    err.status = 403; // or 400 depending on your convention
    throw err;
  }

  // AFTER user is found and password is validated



  const token = generateToken(user);

  try {
    await sendWelcomeEmail(user.email, user.fullname);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }

  return { user, token };
};

//fogrogt password  logic

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) return;

  // Prevent abuse
  if (user.passwordResetAttempts >= 25) {
    throw new Error("Too many reset attempts. Try later.");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  user.passwordResetAttempts += 1;

  await user.save({ validateBeforeSave: false });

const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;
  // LOCAL TESTING
 await sendPasswordResetEmail({
    to: user.email,
    resetLink,
    userName: user.name,
  });
};


export const resetPasswordService = async (token, newPassword) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  user.password = await hashPassword(newPassword);

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetAttempts = 0;
  user.passwordChangedAt = Date.now();

  await user.save();
};

