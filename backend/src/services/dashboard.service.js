import { Job } from "../modules/job/job.model.js";
import { Application } from "../models/application.model.js";

export const getRecruiterDashboardStats = async (recruiterId) => {
  // ✅ 1. Total Jobs by recruiter
  const totalJobs = await Job.countDocuments({ created_by: recruiterId });

  // ✅ 2. Get recruiter job IDs
  const recruiterJobs = await Job.find({ created_by: recruiterId }).select(
    "_id",
  );
  const jobIds = recruiterJobs.map((job) => job._id);

  // ✅ 3. Total Applicants
  const totalApplicants = await Application.countDocuments({
    job: { $in: jobIds },
  });

  // ✅ 4. Active Companies
  const activeCompanies = await Job.distinct("company", {
    created_by: recruiterId,
  });

  // ✅ 5. Recent Applicants
  const recentApplicants = await Application.find({
    job: { $in: jobIds },
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
    recentApplicants,
  };
};
