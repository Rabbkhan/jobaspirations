import { RecruiterApplication } from "./recruiter.model.js";
import { Company } from "#modules/company/company.model.js";
import { uploadToCloud } from "#utils/uploadToCloud.js";
import { User } from "#modules/auth/user.model.js";
import { sendRecruiterApprovedEmail } from "#config/email/email.service.js";

export const applyRecruiter = async (userId, companyData, file) => {
  // Check if user already applied
  const existing = await RecruiterApplication.findOne({ userId });
  if (existing) throw new Error("You have already applied");

  // Create company record (but inactive until admin approves)
  let logoURL = "";
  if (file) {
    const uploaded = await uploadToCloud(file, "image");
    logoURL = uploaded.url;
  }

  const company = await Company.create({
    companyname: companyData.companyname,
    description: companyData.description || "",
    website: companyData.website,
    location: companyData.location,
    employees: companyData.employees,
    logo: logoURL,
    isActive: false, // admin must approve
    userId,
  });

  // Create recruiter application
  const application = await RecruiterApplication.create({
    userId,
    companyId: company._id,
    companyEmail: companyData.companyEmail,
    companyLinkedin: companyData.companyLinkedin || "",
    status: "pending",
  });

  return application;
};

export const getAllRecruiterApplications = async () => {
  return await RecruiterApplication.find()
    .populate("userId", "fullname email")
    .populate("companyId", "companyname location")
    .sort({ createdAt: -1 });
};
// approveRecruiter — add Trigger 7
export const approveRecruiter = async (applicationId) => {
  const application = await RecruiterApplication.findById(applicationId);
  if (!application) throw new Error("Application not found");

  application.status = "approved";
  await application.save();

  const company = await Company.findById(application.companyId);
  company.isActive = true;
  await company.save();

  const user = await User.findById(application.userId);
  user.role = "recruiter";
  user.isApproved = true;
  await user.save();

  // Trigger 7 — notify recruiter they're approved
  await sendRecruiterApprovedEmail(user.email, user.fullname).catch((err) =>
    console.error("Trigger 7 email failed:", err)
  );

  return application;
};
export const rejectRecruiter = async (applicationId, reason = "") => {
  const application = await RecruiterApplication.findById(applicationId);
  if (!application) throw new Error("Application not found");

  if (application.status === "approved") {
    throw new Error("Approved application cannot be rejected");
  }

  application.status = "rejected";
  application.rejectionReason = reason;
  await application.save();

  // Ensure company remains inactive
  const company = await Company.findById(application.companyId);
  if (company) {
    company.isActive = false;
    await company.save();
  }

  // Ensure user is NOT recruiter
  const user = await User.findById(application.userId);
  if (user) {
    user.role = "student"; // or whatever default role is
    user.isApproved = false;
    await user.save();
  }

  return application;
};

export const getMyApplication = async (userId) => {
  return await RecruiterApplication.findOne({ userId }).populate("companyId", "companyname logo");
};
