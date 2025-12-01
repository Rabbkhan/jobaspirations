// services/application.service.js

import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { STATUS } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";


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
    const err = new Error(MESSAGES.JOB_NOT_FOUND);
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
    const err = new Error(MESSAGES.APPLICATION_EXISTS);
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
    message: MESSAGES.APPLICATION_SUBMITTED,
    application,
  };
};

export const getMyApplications = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [apps, total] = await Promise.all([
    Application.find({ applicant: userId })
      .populate({
        path: "job",
        select: "title location salary jobType company",
        populate: {
          path: "company",
          select: "companyname logo location"
        }
      })
      .populate("applicant", "fullname email")
      .sort({ createdAt: -1 })
      .skip(skip)         // ✅ pagination
      .limit(limit),     // ✅ pagination

    Application.countDocuments({ applicant: userId }) // ✅ total count
  ]);

  return {
    success: true,
    applications: apps,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};



export const updateApplicationStatus = async (appId, status) => {
  if (!mongoose.Types.ObjectId.isValid(appId)) {
    throw { status: 400, message: "Invalid application ID" };
  }

  const application = await Application.findById(appId);
  if (!application) {
    throw { status: 404, message: "Application not found" };
  }

  application.status = status;
  await application.save();

  return {
    success: true,
    message: "Status updated successfully",
    application,
  };
};
