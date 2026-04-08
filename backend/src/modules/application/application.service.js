import mongoose from "mongoose";
import { Application } from "./application.model.js";
import { Job } from "#modules/job/job.model.js";
import { STATUS } from "#constants/statusCodes.js";
import { MESSAGES } from "#constants/messages.js";
import { User } from "#modules/auth/user.model.js";
import {
  sendJobApplicationConfirmation,
  sendNewApplicationAlert,
} from "#config/email/email.service.js";
import { FRONTEND_URL } from "#config/env.js";

// APPLY FOR A JOB
// applyForJob — add Trigger 4 & 5
export const applyForJob = async ({ jobId, userId }) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    const err = new Error("Invalid Job ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const job = await Job.findById(jobId).populate("created_by"); // populate recruiter
  if (!job) {
    const err = new Error(MESSAGES.JOB_NOT_FOUND);
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  const missingFields = [];
  if (!user.fullname) missingFields.push("fullname");
  if (!user.email) missingFields.push("email");
  if (!user.phoneNumber) missingFields.push("phoneNumber");
  if (!user.profile.resume) missingFields.push("resume");

  if (missingFields.length > 0) {
    const err = new Error(
      `Please complete your profile before applying. Missing: ${missingFields.join(", ")}`
    );
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const alreadyApplied = await Application.findOne({
    job: jobId,
    applicant: userId,
  });
  if (alreadyApplied) {
    const err = new Error(MESSAGES.APPLICATION_EXISTS);
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const application = await Application.create({
    job: jobId,
    applicant: userId,
  });

  job.applications = job.applications || [];
  job.applications.push(application._id);
  await job.save();

  // Trigger 4 — confirm to candidate
  await sendJobApplicationConfirmation(
    user.email,
    user.fullname,
    job.title,
    job.company?.companyname || "",
    new Date().toLocaleDateString("en-IN")
  ).catch((err) => console.error("Trigger 4 email failed:", err));

  // Trigger 5 — alert recruiter
  if (job.created_by?.email) {
    await sendNewApplicationAlert(
      job.created_by.email,
      job.created_by.fullname,
      user.fullname,
      job.title,
      `${FRONTEND_URL}/recruiter/jobs/${job._id}/applications`
    ).catch((err) => console.error("Trigger 5 email failed:", err));
  }

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
          select: "companyname logo location",
        },
      })
      .populate("applicant", "fullname email")
      .sort({ createdAt: -1 })
      .skip(skip) // ✅ pagination
      .limit(limit), // ✅ pagination

    Application.countDocuments({ applicant: userId }), // ✅ total count
  ]);

  return {
    success: true,
    applications: apps,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateApplicationStatus = async (appId, status, recruiterId) => {
  if (!mongoose.Types.ObjectId.isValid(appId)) {
    throw { status: 400, message: "Invalid application ID" };
  }

  const application = await Application.findById(appId).populate("job", "created_by");
  if (!application) {
    throw { status: 404, message: "Application not found" };
  }

  if (!application.job || application.job.created_by.toString() !== recruiterId.toString()) {
    throw {
      status: 403,
      message: "You are not allowed to update this application",
    };
  }

  application.status = status;
  await application.save();

  return {
    success: true,
    message: "Status updated successfully",
    application,
  };
};
