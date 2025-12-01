// controllers/job.controller.js
import { validationResult } from "express-validator";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getAdminJobs,
  getJobApplicants,
} from "../services/job.service.js";
import { STATUS } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";


// CREATE JOB
export const createJobController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(STATUS.BAD_REQUEST).json({ success: false, errors: errors.array() });
    }
// if (req.body.jobType) {
//   req.body.jobType =
//     req.body.jobType
//       .toLowerCase()
//       .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
//       .replace("-", "-");
// }

    const userId = req.user?.id;
    if (!userId)
      return res.status(STATUS.UNAUTHORIZED).json({ success: false, message: MESSAGES.UNAUTHORIZED });

    const result = await createJob({ data: req.body, userId });

    return res.status(STATUS.CREATED).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};


// GET ALL JOBS
export const getAllJobsController = async (_req, res) => {
  try {
    const result = await getAllJobs();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};


// GET JOB BY ID
export const getJobByIdController = async (req, res) => {
  try {
    const result = await getJobById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};


// UPDATE JOB
export const updateJobController = async (req, res) => {
  try {
    const result = await updateJob({
      jobId: req.params.id,
      data: req.body,
      userId: req.user.id,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

//admin job 

export const getAdminJobsController = async (req, res) => {
  try {
    const userId = req.user.id; // Coming from auth middleware

    const data = await getAdminJobs(userId);

    return res.status(200).json({
      success: true,
      jobs: data.jobs
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message
    });
  }
};


export const getJobApplicantsController = async (req, res) => {
  try {
    const { jobId } = req.params;

    const result = await getJobApplicants(jobId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// DELETE JOB
export const deleteJobController = async (req, res) => {
  try {
    const result = await deleteJob({
      jobId: req.params.id,
      userId: req.user.id,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};
