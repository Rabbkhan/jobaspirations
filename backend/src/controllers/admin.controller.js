import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { RecruiterApplication } from "../models/recruiter.model.js";
import { Company } from "../models/company.model.js";

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
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
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
        _id: admin.id.toString(),
        email: admin.email,
        fullname: admin.fullname,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const adminMeController = async (req, res) => {
  const admin = await User.findById(req.user.id).select(
    "_id email fullname role"
  );

  if (!admin) {
    return res.status(401).json({ success: false });
  }

  res.status(200).json({
    success: true,
    safeUser: {
      _id: admin.id.toString(),
      email: admin.email,
      fullname: admin.fullname,
      role: admin.role,
    },
  });
};




// Logout: clear cookie

export const adminLogoutController = (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });

  res.status(200).json({ success: true });
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





export const getPendingRecruiterApplications = async (req, res) => {
  try {
    const pendingApplications = await RecruiterApplication.find({ status: "pending" })
      .populate("userId", "fullname email")
      .populate("companyId", "companyname website location employees logo");

    res.status(200).json({ success: true, applications: pendingApplications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -----------------------
// Approve Recruiter Application
// -----------------------
export const approveRecruiterApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await RecruiterApplication.findById(applicationId);
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });

    // Update application status
    application.status = "approved";
    await application.save();

    // Activate company
    const company = await Company.findById(application.companyId);
    if (company) {
      company.isActive = true;
      await company.save();
    }

    // Update user role
    const user = await User.findById(application.userId);
    if (user) {
      user.role = "recruiter";
      user.isApproved = true;
      await user.save();
    }

    res.status(200).json({ success: true, message: "Recruiter approved successfully", application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -----------------------
// Reject Recruiter Application
// -----------------------
export const rejectRecruiterApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await RecruiterApplication.findById(applicationId);
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });

    application.status = "rejected";
    await application.save();

    res.status(200).json({ success: true, message: "Recruiter application rejected", application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
