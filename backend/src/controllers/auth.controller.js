import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/statusCodes.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { validationResult } from "express-validator";
import { updateProfile } from "../services/user.service.js";

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

// Login

export const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // must be HTTPS in production
      sameSite: "none", // required for cross-domain
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const safeUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    res.status(STATUS.OK).json({
      success: true,
      safeUser,
      message: MESSAGES.LOGIN_SUCCESS,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    console.log(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};

// logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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

//update profile

export const updateProfileController = async (req, res) => {
  try {
    const resumeFile = req.files?.resume?.[0] || null;
    const profilePhotoFile = req.files?.profilePhoto?.[0] || null;

    const updatedUser = await updateProfile({
      userId: req.user.id,
      fullname: req.body.fullname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      bio: req.body.bio,
      skills: req.body.skills,
      resumeFile,
      profilePhotoFile,
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
