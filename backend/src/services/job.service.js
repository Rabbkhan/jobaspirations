

// services/job.service.js
import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/statusCodes.js";
import { ALLOWED_INDUSTRIES, ALLOWED_LOCATIONS } from "../constants/job.constants.js";


// =============================
// CREATE JOB
// =============================
export const createJob = async ({ data, userId }) => {
  const { company, location, industry, salary, experience } = data;

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


  if (!ALLOWED_LOCATIONS.includes(location)) {
    const err = new Error("Invalid location");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  if (!ALLOWED_INDUSTRIES.includes(industry)) {
    const err = new Error("Invalid industry");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

   if (!salary?.min || !salary?.max) {
    throw new Error("Salary min and max are required");
  }

  if (salary.max < salary.min) {
    throw new Error("Max salary must be greater than min salary");
  }

  if (
    experience?.min === undefined ||
    experience?.max === undefined
  ) {
    throw new Error("Experience min and max are required");
  }

  if (experience.max < experience.min) {
    throw new Error("Max experience must be >= min experience");
  }


  const job = await Job.create({
    ...data,
    salary,
    experience,
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
    limit = 10,
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
    filter["salary.min"] = { $lte: max };
    filter["salary.max"] = { $gte: min };
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
  return {
    success: true,
    filters: {
      locations: ALLOWED_LOCATIONS,
      industries: ALLOWED_INDUSTRIES,
     salaries: [
  { label: "₹0 - ₹50,000", value: "0-50000" },
  { label: "₹50k - ₹1L", value: "50000-100000" },
  { label: "₹1L+", value: "100000-1000000" },
],
experiences: [
  { label: "Fresher", value: "0-0" },
  { label: "0-2 Years", value: "0-24" },
  { label: "1-3 Years", value: "12-36" },
  { label: "3+ Years", value: "36-120" },
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

if (data.location && !ALLOWED_LOCATIONS.includes(data.location)) {
    const err = new Error("Invalid location");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

    if (data.industry && !ALLOWED_INDUSTRIES.includes(data.industry)) {
    const err = new Error("Invalid industry");
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

   if (data.salary) {
    const { min, max } = data.salary;

    if (min === undefined || max === undefined) {
      const err = new Error("Salary min and max are required");
      err.status = STATUS.BAD_REQUEST;
      throw err;
    }

    if (max < min) {
      const err = new Error("Salary max must be greater than min");
      err.status = STATUS.BAD_REQUEST;
      throw err;
    }
  }
 if (data.experience) {
    const { min, max } = data.experience;

    if (min === undefined || max === undefined) {
      const err = new Error("Experience min and max are required");
      err.status = STATUS.BAD_REQUEST;
      throw err;
    }

    if (max < min) {
      const err = new Error("Experience max must be >= min");
      err.status = STATUS.BAD_REQUEST;
      throw err;
    }
  }


  const job = await Job.findById(jobId);
  if (!job) {
    const err = new Error(MESSAGES.JOB_NOT_FOUND);
    err.status = STATUS.NOT_FOUND;
    throw err;
  }
  if (job.created_by.toString() !== userId.toString()) {
    const err = new Error(MESSAGES.CANNOT_EDIT_OTHERS_JOB);
    err.status = STATUS.FORBIDDEN;
    throw err;
  }


  
  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    { $set: data },
    { new: true, runValidators: true }
  );

  return {
    success: true,
    message: MESSAGES.JOB_UPDATED,
    job: updatedJob,
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
