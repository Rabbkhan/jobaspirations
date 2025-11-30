// controllers/application.controller.js
import {
  applyForJob,
  getMyApplications,
  updateApplicationStatus
} from "../services/application.service.js";
import { STATUS } from "../constants/statusCodes.js";


// APPLY FOR JOB
export const applyForJobController = async (req, res) => {
  try {
    const result = await applyForJob({
      jobId: req.params.jobId,
      userId: req.user.id
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

    const result = await getMyApplications(req.user.id, page, limit);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message
    });
  }
};





// UPDATE APPLICATION STATUS
export const updateApplicationStatusController = async (req, res) => {
  try {
    const result = await updateApplicationStatus({
      appId: req.params.appId,
      status: req.body.status,
      userId: req.user.id
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};
