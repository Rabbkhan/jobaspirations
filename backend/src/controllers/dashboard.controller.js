import { getRecruiterDashboardStats } from "../services/dashboard.service.js";

export const getRecruiterDashboardController = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const result = await getRecruiterDashboardStats(recruiterId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Dashboard data fetch failed",
    });
  }
};
