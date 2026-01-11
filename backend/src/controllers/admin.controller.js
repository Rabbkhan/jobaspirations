import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!process.env.SECRET_KEY) {
      throw new Error("JWT_SECRET missing");
    }

    const admin = await User.findOne({
      email: email.toLowerCase(),
      role: "admin",
    });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      safeUser: {
        _id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};




export const adminMeController = (req, res) => {
  res.status(200).json({
    success: true,
    role: "admin",
    email: req.user.email,
  });
};


// Logout: clear cookie
export const adminLogoutController = (req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true, message: "Logged out" });
};

// 1️⃣ Get all pending recruiters/companies
export const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({
      role: { $in: ["recruiter", "company"] },
      isApproved: false,
    });
    res.status(200).json({ success: true, users: pendingUsers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2️⃣ Approve a recruiter or company
export const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isApproved = true;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: `${user.role} approved successfully` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
