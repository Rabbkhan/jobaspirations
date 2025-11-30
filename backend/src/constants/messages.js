export const MESSAGES = {
  // ==========================
  // 🔹 COMMON / GLOBAL
  // ==========================
  SERVER_ERROR: "Something went wrong, please try again later.",
  UNAUTHORIZED: "Unauthorized access.",
  FORBIDDEN: "You don’t have permission to perform this action.",
  INVALID_INPUT: "Invalid input data.",
  MISSING_FIELDS: "Required fields are missing.",
  NOT_FOUND: "Requested resource not found.",

  // ==========================
  // 👤 AUTH & USER MODULE
  // ==========================
  REGISTER_SUCCESS: "Account created successfully.",
  LOGIN_SUCCESS: "Logged in successfully.",
  LOGOUT_SUCCESS: "Logged out successfully.",
  USER_EXISTS: "An account already exists with this email.",
  AUTH_REQUIRED: "Please login to continue.",
  SESSION_EXPIRED: "Your session has expired. Please login again.",
  AUTH_INVALID: "Authentication failed. Please login again.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  ROLE_MISMATCH: "Account doesn't exist with current role.",
  TOKEN_EXPIRED: "Session expired, please login again.",
  INVALID_TOKEN: "Invalid token!.",

  PASSWORD_UPDATED: "Password updated successfully.",
  PROFILE_UPDATED: "Profile updated successfully.",

  // ==========================
  // 🧑‍🎓 STUDENT ACTIONS
  // ==========================
  JOB_SAVED: "Job saved successfully.",
  JOB_ALREADY_SAVED: "You’ve already saved this job.",
  JOB_UNSAVED: "Job removed from your saved list.",
  APPLICATION_SUBMITTED: "Your application has been submitted successfully.",
  APPLICATION_EXISTS: "You’ve already applied for this job.",
  APPLICATION_WITHDRAWN: "You’ve withdrawn your application.",
  NO_SAVED_JOBS: "You haven’t saved any jobs yet.",
  NO_APPLICATIONS: "You haven’t applied for any jobs yet.",
  PROFILE_UPDATE: "Profile updated successfully.",

  // ==========================
  // 🧑‍💼 RECRUITER ACTIONS
  // ==========================
  JOB_CREATED: "Job posted successfully.",
  JOB_UPDATED: "Job updated successfully.",
  JOB_DELETED: "Job deleted successfully.",
  JOB_NOT_FOUND: "Job not found or has been removed.",
  CANNOT_EDIT_OTHERS_JOB: "You are not allowed to edit this job.",
  CANNOT_DELETE_OTHERS_JOB: "You are not allowed to delete this job.",
  INVALID_ID: "Invalid company ID",
  APPLICATION_VIEWED: "Application marked as viewed.",
  APPLICATION_STATUS_UPDATED: "Application status updated successfully.",
  NO_JOBS_FOUND: "No job postings found yet.",

  // ==========================
  // 💼 JOB & CATEGORY MANAGEMENT
  // ==========================
  CATEGORY_CREATED: "Job category created successfully.",
  CATEGORY_EXISTS: "This category already exists.",
  CATEGORY_DELETED: "Category deleted successfully.",
  CATEGORY_NOT_FOUND: "Category not found.",

  // ==========================
  // 📩 NOTIFICATIONS / COMMUNICATION
  // ==========================
  EMAIL_SENT: "Email sent successfully.",
  EMAIL_FAILED: "Failed to send email.",
  MESSAGE_SENT: "Message sent successfully.",
  MESSAGE_FAILED: "Failed to send message.",

  // ==========================
  // ⚙️ ADMIN / SYSTEM
  // ==========================
  ACCOUNT_DISABLED: "This account has been disabled by the admin.",
  ACCOUNT_VERIFIED: "Account verified successfully.",
  ACCOUNT_ALREADY_VERIFIED: "Account already verified.",

  // ==========================
  // 🏢 COMPANY MANAGEMENT
  // ==========================
  COMPANY_CREATED: "Company created successfully.",
  COMPANY_EXISTS: "A company with this name already exists.",
  COMPANY_UPDATED: "Company updated successfully.",
  COMPANY_DELETED: "Company deleted successfully.",
  COMPANY_NOT_FOUND: "Company not found.",
  CANNOT_EDIT_OTHERS_COMPANY: "You are not allowed to edit this company.",
  CANNOT_DELETE_OTHERS_COMPANY: "You are not allowed to delete this company.",
  NO_COMPANIES_FOUND: "No companies found.",
};
