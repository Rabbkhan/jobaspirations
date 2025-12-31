import { User } from "../models/user.model.js";

// 1️⃣ Get all pending recruiters/companies
export const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ role: { $in: ["recruiter","company"] }, isApproved: false });
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

    res.status(200).json({ success: true, message: `${user.role} approved successfully` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
