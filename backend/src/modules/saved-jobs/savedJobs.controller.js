import { getSavedJobsService, saveJobService, unsaveJobService } from "./savedJob.service.js";
import { STATUS } from "#constants/statusCodes.js";

export const getSavedJobsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await getSavedJobsService(userId);

    res.status(STATUS.OK).json({
      success: true,
      savedJobs: result.savedJobs,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
};

export const saveJobController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId } = req.params;

    const result = await saveJobService({ userId, jobId });

    res.status(STATUS.OK).json({
      success: true,
      savedJobs: result.savedJobs,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
};

export const unsaveJobController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId } = req.params;

    const result = await unsaveJobService({ userId, jobId });

    res.status(STATUS.OK).json({
      success: true,
      savedJobs: result.savedJobs,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
};
