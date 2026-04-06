import { getRecruiterDashboardStats } from "./dashboard.service.js";

export const getRecruiterDashboardController = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    // console.log("DASHBOARD recruiterId:", recruiterId);

    const result = await getRecruiterDashboardStats(recruiterId);

    // console.log("DASHBOARD DATA:", result);

    return res.status(200).json(result);
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Dashboard data fetch failed",
    });
  }
};
