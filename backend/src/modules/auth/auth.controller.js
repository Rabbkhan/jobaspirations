import { MESSAGES } from "#constants/messages.js";
import { STATUS } from "#constants/statusCodes.js";
import { validationResult } from "express-validator";
import {
  forgotPasswordService,
  loginUser,
  registerUser,
  requestVerificationCodeService,
  resetPasswordService,
  verifyEmailService,
} from "./auth.service.js";
import { getProfileService, updateProfile } from "./user.service.js";
// import crypto from "crypto";
// import { User } from "../models/user.model.js";

// Register

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullname, email, phoneNumber, password, role } = req.body;
    const profilePhoto = req.file; // <-- THE FIX

    const result = await registerUser({
      fullname,
      email,
      phoneNumber,
      password,
      role,
      profilePhoto,
    });

    res.status(STATUS.CREATED).json(result);
  } catch (error) {
    console.error("Register Error:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const result = await verifyEmailService(email, code);

    return res.status(result.status).json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    console.error("Verify Email Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error verifying email",
    });
  }
};

export const requestVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({
        success: false,
        message: "Email required",
      });

    const result = await requestVerificationCodeService(email);

    return res.status(result.status).json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    console.error("Request Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while generating verification code",
    });
  }
};

// Login

export const login = async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  try {
    const result = await loginUser(req.body);

    if (!result || !result.user || result.user.role === "admin") {
      return res.status(STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const { user, token } = result;

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const safeUser = {
      _id: user._id.toString(), // safe access
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isPlaced: Boolean(user.isPlaced),
      hasReviewed: Boolean(user.hasReviewed),
      placedAt: user.placedAt || null,
      profile: user.profile,
    };

    res.status(STATUS.OK).json({
      success: true,
      safeUser,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(error.status || STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.status === STATUS.UNAUTHORIZED ? "Invalid email or password" : "Server error",
    });
  }
};

// logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ✅ MUST MATCH
    });

    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES.LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.error("Logout Error:", error.message);

    res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.LOGOUT_FAILED,
    });
  }
};

// ------------------- GET PROFILE -------------------
export const getProfile = async (req, res) => {
  try {
    const user = await getProfileService(req.user._id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

//update profile

export const updateProfileController = async (req, res) => {
  try {
    const resumeFile = req.files?.resume?.[0] || null;
    const profilePhotoFile = req.files?.profilePhoto?.[0] || null;

    // console.log("BODY:", req.body);
    // console.log("FILES:", req.files);
    // console.log("Resume:", resumeFile);
    // console.log("Profile Photo:", profilePhotoFile);
    const updatedUser = await updateProfile({
      userId: req.user._id,
      fullname: req.body.fullname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      bio: req.body.bio,
      skills: req.body.skills,
      resumeFile,
      profilePhotoFile,
    });

    const userObj = updatedUser.toObject();
    delete userObj.password;

    res.status(200).json(userObj);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// export const verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.query;

//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(token)
//       .digest("hex");

//     const user = await User.findOne({
//       emailVerificationToken: hashedToken,
//       emailVerificationExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired verification token",
//       });
//     }

//     user.isEmailVerified = true;
//     user.emailVerificationToken = undefined;
//     user.emailVerificationExpires = undefined;

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Email verified successfully. You can now log in.",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Email verification failed",
//     });
//   }
// };

export const forgotPasswordController = async (req, res, next) => {
  try {
    await forgotPasswordService(req.body.email);
    res.status(200).json({
      message: "If the email exists, a reset link has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    await resetPasswordService(req.params.token, req.body.password);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};
