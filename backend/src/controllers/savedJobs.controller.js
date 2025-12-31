// controllers/savedJob.controller.js
import { getSavedJobs, saveJob, unsaveJob } from "../services/savedJob.service.js";
import { STATUS } from "../constants/statusCodes.js";

export const getSavedJobsController = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(STATUS.UNAUTHORIZED).json({ success: false, message: "User not authenticated" });

    const savedJobs = await getSavedJobs(userId);
    res.status(STATUS.OK).json({ success: true, savedJobs });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message || "Failed to fetch saved jobs" });
  }
};

export const saveJobController = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { jobId } = req.params;
    if (!userId) return res.status(STATUS.UNAUTHORIZED).json({ success: false, message: "User not authenticated" });
    if (!jobId) return res.status(STATUS.BAD_REQUEST).json({ success: false, message: "Job ID required" });

    const savedJobs = await saveJob({ userId, jobId });
    res.status(STATUS.OK).json({ success: true, savedJobs });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message || "Failed to save job" });
  }
};

export const unsaveJobController = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { jobId } = req.params;
    if (!userId) return res.status(STATUS.UNAUTHORIZED).json({ success: false, message: "User not authenticated" });
    if (!jobId) return res.status(STATUS.BAD_REQUEST).json({ success: false, message: "Job ID required" });

    const savedJobs = await unsaveJob({ userId, jobId });
    res.status(STATUS.OK).json({ success: true, savedJobs });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message || "Failed to unsave job" });
  }
};
