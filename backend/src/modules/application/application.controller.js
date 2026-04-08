import { applyForJob, getMyApplications, updateApplicationStatus } from "./application.service.js";
import { STATUS } from "#constants/statusCodes.js";

// APPLY FOR JOB
export const applyForJobController = async (req, res) => {
  try {
    const result = await applyForJob({
      jobId: req.params.jobId,
      userId: req.user._id,
    });

    return res.status(STATUS.CREATED).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

// GET MY APPLICATIONS
export const getMyApplicationsController = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getMyApplications(req.user._id, page, limit);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE APPLICATION STATUS
export const updateApplicationStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const { appId } = req.params;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const result = await updateApplicationStatus(appId, status, req.user._id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
