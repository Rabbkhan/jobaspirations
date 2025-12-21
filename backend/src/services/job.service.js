

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
export const getAllJobs = async (query) => {
  const {
    page = 1,
    limit = 9,
    location,
    industry,
    salary,
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const filter = {};

  if (location) filter.location = location;
  if (industry) filter.industry = industry;

  if (salary) {
    const [min, max] = salary.split("-").map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      filter.salary = { $gte: min, $lte: max };
    }
  }

  const jobs = await Job.find(filter)
    .populate("company", "name location")
    .populate("created_by", "fullname email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  const total = await Job.countDocuments(filter);

  return {
    success: true,
    jobs,
    hasMore: skip + jobs.length < total,
    total,
  };
};


// services/job.service.js
export const getJobFilters = async () => {
  const locations = await Job.distinct("location");
  const industries = await Job.distinct("industry");

  return {
    success: true,
    filters: {
      locations,
      industries,
      salaries: [
        { label: "₹0 - ₹50,000", value: "0-50000" },
        { label: "₹50,001 - ₹80,000", value: "50001-80000" },
        { label: "₹80,001 - ₹1,20,000", value: "80001-120000" },
      ],
    },
  };
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
    .populate("company", "companyname location")
    .populate("created_by", "fullname email")
    .populate({
      path: "applications",
      populate: {
        path: "applicant",
        select: "_id fullname email"
      }
    });

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
 
    .populate({path:"company"})
    .populate("created_by", "fullname email");

  return { success: true, jobs };
};

// =============================
// Applied applicants details
// =============================

export const getJobApplicants = async (jobId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new Error("Invalid Job ID");
  }

  const job = await Job.findById(jobId).populate({
    path: "applications",
    populate: {
      path: "applicant",
      select: "fullname email phoneNumber profile",
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  return {
    success: true,
    jobTitle: job.title,
    applicants: job.applications,
  };
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

  // ✅ FIXED: Safe ownership check
  if (job.created_by.toString() !== userId.toString()) {
    const err = new Error(MESSAGES.CANNOT_DELETE_OTHERS_JOB);
    err.status = STATUS.FORBIDDEN;
    throw err;
  }

  // ✅ FIXED: Delete the actual instance
  await job.deleteOne();

  return {
    success: true,
    message: MESSAGES.JOB_DELETED,
    deletedJobId: jobId,
  };
};
