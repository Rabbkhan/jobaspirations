import { getSenderInfo, transporter } from "#config/email/email.config.js";
import {
  passwordResetEmailTemplate,
  verificationEmailTemplate,
  welcomeEmailTemplate,
  jobApplicationConfirmationTemplate, // add this
  newApplicationAlertTemplate, // add this
  newJobAlertTemplate, // add this
  recruiterApprovedTemplate,
} from "#config/email/email.templates.js";

export const sendVerificationCode = async (
  email,
  verificationCode,
  userName,
) => {
  try {
    const sender = getSenderInfo();

    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Your Email Verification Code",
      text: `Your verification code is: ${verificationCode}`,
      html: verificationEmailTemplate(userName, verificationCode),
    });

    return true;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return false;
  }
};

export const sendWelcomeEmail = async (email, userName) => {
  try {
    const sender = getSenderInfo();

    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Welcome Back to Job Aspirations",
      text: `Welcome back ${userName}, we're glad to see you again.`,
      html: welcomeEmailTemplate(userName),
    });

    return true;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
};

export const sendPasswordResetEmail = async ({ to, resetLink, userName }) => {
  try {
    if (!to) {
      throw new Error("Email recipient is missing");
    }

    const sender = getSenderInfo();

    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to,
      subject: "Reset Your Password",
      text: `Reset your password using this link: ${resetLink}`,
      html: passwordResetEmailTemplate(userName, resetLink),
    });

    return true;
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
};

export const sendJobApplicationConfirmation = async (
  email,
  candidateName,
  jobTitle,
  companyName,
  appliedDate,
) => {
  try {
    const sender = getSenderInfo();
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: `Application Submitted for ${jobTitle} — Job Aspirations`,
      text: `Hi ${candidateName}, you have successfully applied for ${jobTitle} at ${companyName} on ${appliedDate}. Good luck!`,
      html: jobApplicationConfirmationTemplate(
        candidateName,
        jobTitle,
        companyName,
        appliedDate,
      ),
    });
    return true;
  } catch (error) {
    console.error("Failed to send application confirmation email:", error);
    return false;
  }
};

// TRIGGER 5: Candidate applies for a job → send to recruiter
// Call this inside your applyJob controller right after Trigger 4
// Usage:
// await sendNewApplicationAlert(
//   recruiter.email,
//   recruiter.name,
//   candidate.name,
//   job.title,
//   `https://jobaspirations.in/recruiter/applications/${application._id}`
// );
export const sendNewApplicationAlert = async (
  recruiterEmail,
  recruiterName,
  candidateName,
  jobTitle,
  recruiterPanelUrl,
) => {
  try {
    const sender = getSenderInfo();
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: recruiterEmail,
      subject: `New Application Received for ${jobTitle} — Job Aspirations`,
      text: `Hello ${recruiterName}, ${candidateName} has applied for ${jobTitle}. Login to your recruiter panel to review their profile: ${recruiterPanelUrl}`,
      html: newApplicationAlertTemplate(
        recruiterName,
        candidateName,
        jobTitle,
        recruiterPanelUrl,
      ),
    });
    return true;
  } catch (error) {
    console.error("Failed to send new application alert email:", error);
    return false;
  }
};

// TRIGGER 6: New job posted → send to matching candidates
// Call this inside your createJob controller after saving job to DB
// Usage:
// const matchingCandidates = await findMatchingCandidates(job);
// for (const candidate of matchingCandidates) {
//   await sendNewJobAlert(
//     candidate.email,
//     candidate.name,
//     job.title,
//     job.companyName,
//     job.location,
//     job.jobType,
//     `https://jobaspirations.in/jobs/${job._id}`
//   );
// }
export const sendNewJobAlert = async (
  email,
  candidateName,
  jobTitle,
  companyName,
  location,
  jobType,
  jobUrl,
) => {
  try {
    const sender = getSenderInfo();
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: `New Job Alert: ${jobTitle} at ${companyName} — Job Aspirations`,
      text: `Hi ${candidateName}, a new job matching your profile has been posted: ${jobTitle} at ${companyName} in ${location}. Apply now: ${jobUrl}`,
      html: newJobAlertTemplate(
        candidateName,
        jobTitle,
        companyName,
        location,
        jobType,
        jobUrl,
      ),
    });
    return true;
  } catch (error) {
    console.error("Failed to send job alert email:", error);
    return false;
  }
};

// TRIGGER 7: Admin approves recruiter account → send to recruiter
// Call this inside your admin approveRecruiter controller
// Usage:
// await sendRecruiterApprovedEmail(recruiter.email, recruiter.name);
export const sendRecruiterApprovedEmail = async (email, recruiterName) => {
  try {
    const sender = getSenderInfo();
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Your Recruiter Account is Approved — Job Aspirations",
      text: `Congratulations ${recruiterName}! Your recruiter account has been approved by our admin team. You can now login and start posting jobs at https://jobaspirations.in/recruiter/login`,
      html: recruiterApprovedTemplate(recruiterName),
    });
    return true;
  } catch (error) {
    console.error("Failed to send recruiter approved email:", error);
    return false;
  }
};
