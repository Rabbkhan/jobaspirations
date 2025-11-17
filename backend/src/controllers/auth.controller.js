import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/statusCodes.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { validationResult } from "express-validator";
import { updateProfile } from "../services/user.service.js";

// Register

export const register = async (req, res) => {
  try {
    // 1️⃣ Validate input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // 2️⃣ Call service to handle business logic
    const result = await registerUser(req.body);

    // 3️⃣ Send success response
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

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path:'/',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

   const  safeUser = {
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
      message: MESSAGES.SERVER_ERROR,
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
      message: "Failed to logout",
    });
  }
};



//update profile


export const updateProfileController = async (req, res) => {

   const userId = req.user.id;

  try {
    
const updatedUser = await updateProfile({
    userId,
      fullname: req.body.fullname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      bio: req.body.bio,
      skills: req.body.skills,
});


res.status(STATUS.OK).json({
  success:true,
  message: MESSAGES.PROFILE_UPDATE,
  data:updatedUser
})

  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json({
      success:false,
      message:MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message
    })
  }


}