import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyEmail = async (req, res) => {
  try {
    const { token, email } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      email,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // ✅ mark verified
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    // 🔥 AUTO LOGIN TOKEN
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ❗ remove sensitive fields
    const safeUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token: authToken,
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email verification failed",
    });
  }
};
