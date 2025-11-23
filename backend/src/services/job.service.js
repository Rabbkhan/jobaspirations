

// services/job.service.js
import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/statusCodes.js";


// =============================
// CREATE JOB
// =============================
export const createJob = async ({ data, userId }) => {
  const { company } = data;

  if (!mongoose.Types.ObjectId.isValid(company)) {
    const err = new Error(MESSAGES.INVALID_ID);
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const existingCompany = await Company.findById(company);
  if (!existingCompany) {
    const err = new Error(MESSAGES.COMPANY_NOT_FOUND);
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  if (existingCompany.userId.toString() !== userId) {
    const err = new Error("You cannot post jobs for another company.");
    err.status = STATUS.FORBIDDEN;
    throw err;
  }

  const job = await Job.create({
    ...data,
    created_by: userId,
  });

  return {
    success: true,
    message: MESSAGES.JOB_CREATED,
    job,
  };
};


// =============================
// GET ALL JOBS
// =============================
export const getAllJobs = async () => {
  const jobs = await Job.find()
    .populate("company", "name location")
    .populate("created_by", "fullname email");

  return { success: true, jobs };
};


// =============================
// GET JOB BY ID
// =============================
export const getJobById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("Invalid job ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const job = await Job.findById(id)
    .populate("company", "name location")
    .populate("created_by", "fullname email");

  if (!job) {
    const err = new Error("Job not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  return { success: true, job };
};


// =============================
// UPDATE JOB
// =============================
export const updateJob = async ({ jobId, data, userId }) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    const err = new Error("Invalid job ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const job = await Job.findById(jobId);
  if (!job) {
    const err = new Error(MESSAGES.JOB_NOT_FOUND);
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  if (job.created_by.toString() !== userId) {
    const err = new Error(MESSAGES.CANNOT_EDIT_OTHERS_JOB);
    err.status = STATUS.FORBIDDEN;
    throw err;
  }

  const updated = await Job.findByIdAndUpdate(jobId, data, { new: true });

  return {
    success: true,
    message: MESSAGES.JOB_UPDATED,
    job: updated,
  };
};

// =============================
// GET ADMIN JOBS (Created by logged-in user)
// =============================
export const getAdminJobs = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error("Invalid user ID");
    err.status = 400;
    throw err;
  }

  const jobs = await Job.find({ created_by: userId })
    .populate("company", "name location")
    .populate("created_by", "fullname email");

  return { success: true, jobs };
};




// =============================
// DELETE JOB
// =============================
export const deleteJob = async ({ jobId, userId }) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    const err = new Error("Invalid job ID");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const job = await Job.findById(jobId);
  if (!job) {
    const err = new Error(MESSAGES.JOB_NOT_FOUND);
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  if (job.created_by.toString() !== userId) {
    const err = new Error(MESSAGES.CANNOT_DELETE_OTHERS_JOB);
    err.status = STATUS.FORBIDDEN;
    throw err;
  }

  await Job.findByIdAndDelete(jobId);

  return {
    success: true,
    message: MESSAGES.JOB_DELETED,
  };
};
