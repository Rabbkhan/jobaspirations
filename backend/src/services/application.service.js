// services/application.service.js

import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { STATUS } from "../constants/statusCodes.js";


// APPLY FOR A JOB
export const applyForJob = async ({ jobId, userId }) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    const err = new Error("Invalid Job ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  // Fetch job
  const job = await Job.findById(jobId);

  if (!job) {
    const err = new Error("Job not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  // Ensure applications array exists
  job.applications = job.applications || [];

  // Prevent duplicate application
  const alreadyApplied = await Application.findOne({
    job: jobId,
    applicant: userId,
  });

  if (alreadyApplied) {
    const err = new Error("You already applied for this job");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  // Create new application
  const application = await Application.create({
    job: jobId,
    applicant: userId,
  });

  // Push application reference into job model
  job.applications.push(application._id);
  await job.save();

  return {
    success: true,
    message: "Application submitted successfully",
    application,
  };
};



export const getMyApplications = async (userId) => {
  const apps = await Application.find({ applicant: userId })
    .populate("job", "title company location salary")
    .populate("applicant", "fullname email");

  return { success: true, applications: apps };
};




export const updateApplicationStatus = async ({ appId, status, userId }) => {
  if (!["pending", "accepted", "rejected"].includes(status)) {
    const err = new Error("Invalid status");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const application = await Application.findById(appId).populate("job");

  if (!application) {
    const err = new Error("Application not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  // Only job owner can update application status
  if (application.job.created_by.toString() !== userId) {
    const err = new Error("Unauthorized to update application");
    err.status = STATUS.FORBIDDEN;
    throw err;
  }

  application.status = status;
  await application.save();

  return {
    success: true,
    message: "Application status updated",
    application,
  };
};
