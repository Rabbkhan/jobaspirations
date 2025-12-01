import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";

export const getRecruiterDashboardStats = async (recruiterId) => {
  // 1️⃣ Total Jobs Posted by Recruiter
  const totalJobs = await Job.countDocuments({ recruiter: recruiterId });

  // 2️⃣ Total Applicants For Recruiter's Jobs
  const recruiterJobs = await Job.find({ recruiter: recruiterId }).select("_id");
  const jobIds = recruiterJobs.map(job => job._id);

  const totalApplicants = await Application.countDocuments({
    job: { $in: jobIds }
  });

  // 3️⃣ Active Companies (unique companies from recruiter jobs)
  const activeCompanies = await Job.distinct("company", {
    recruiter: recruiterId
  });

  // 4️⃣ Recent Applications (last 5)
  const recentApplicants = await Application.find({
    job: { $in: jobIds }
  })
    .populate("applicant", "fullname email")
    .populate("job", "title")
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    success: true,
    stats: {
      totalJobs,
      totalApplicants,
      activeCompanies: activeCompanies.length,
    },
    recentApplicants
  };
};
