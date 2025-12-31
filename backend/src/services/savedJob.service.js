import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { STATUS } from "../constants/statusCodes.js";


// ---------------- SAVE JOB ----------------
export const saveJob = async ({ userId, jobId }) => {
  // Validate jobId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    const err = new Error("Invalid Job ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  // Check if job exists
  const jobExists = await Job.exists({ id: jobId });
  if (!jobExists) {
    const err = new Error("Job not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }



  // Update user saved list
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { savedJobs: jobId } },  // prevents duplicates
    { new: true }
  );

  if (!updatedUser) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  return {
    success: true,
    message: "Job saved successfully",
  };
};



// ---------------- UNSAVE JOB ----------------
export const unsaveJob = async ({ userId, jobId }) => {
  // Validate jobId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    const err = new Error("Invalid Job ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { savedJobs: jobId } },
    { new: true }
  );

  if (!updatedUser) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  return {
    success: true,
    message: "Job removed from saved list",
  };
};



// ---------------- GET SAVED JOBS ----------------
export const getSavedJobs = async (userId) => {
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error("Invalid user ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const user = await User.findById(userId)
    .populate({
      path: "savedJobs",
      populate: {
        path: "company",
        select: "companyname location",   // what to return
      },
    })
    .select("savedJobs");

  if (!user) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  return {
    success: true,
    savedJobs: user.savedJobs || [],
  };
};
