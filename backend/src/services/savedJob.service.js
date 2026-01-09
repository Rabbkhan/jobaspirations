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

  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { savedJobs: jobId } },
    { new: true }
  ).populate("savedJobs");

  if (!user) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  return { savedJobs: user.savedJobs };
};

// ---------------- UNSAVE JOB ----------------
export const unsaveJobService = async ({ userId, jobId }) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    const err = new Error("Invalid Job ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { savedJobs: jobId } },
    { new: true }
  ).populate("savedJobs");

  if (!user) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  return { savedJobs: user.savedJobs };
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
