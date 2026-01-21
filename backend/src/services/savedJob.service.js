import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { STATUS } from "../constants/statusCodes.js";

// ---------------- SAVE JOB ----------------
export const saveJobService = async ({ userId, jobId }) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    const err = new Error("Invalid Job ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const jobExists = await Job.exists({ _id: jobId });
  if (!jobExists) {
    const err = new Error("Job not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  // Check if already saved
  const alreadySaved = user.savedJobs.includes(jobId);

  if (alreadySaved) {
    return {
      success: true,
      message: "Job is already saved",
      savedJobs: user.savedJobs,
    };
  }

  user.savedJobs.push(jobId);
  await user.save();

  await user.populate("savedJobs");

  return {
    success: true,
    message: "Job saved successfully",
    savedJobs: user.savedJobs,
  };
};

// ---------------- UNSAVE JOB ----------------
export const unsaveJobService = async ({ userId, jobId }) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    const err = new Error("Invalid Job ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  const wasSaved = user.savedJobs.includes(jobId);

  if (!wasSaved) {
    return {
      success: true,
      message: "Job was not in saved list",
      savedJobs: user.savedJobs,
    };
  }

  user.savedJobs.pull(jobId);
  await user.save();

  await user.populate("savedJobs");

  return {
    success: true,
    message: "Job removed from saved jobs",
    savedJobs: user.savedJobs,
  };
};


// ---------------- GET SAVED JOBS ----------------
export const getSavedJobsService = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error("Invalid User ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const user = await User.findById(userId)
  .select("savedJobs")
  .populate({
    path: "savedJobs",
    populate: {
      path: "company",
      model: "Company",
    },
  });

  if (!user) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  return { savedJobs: user.savedJobs || [] };
};
