export const mapJSearchToCompany = (apiJob) => {
  return {
    companyname: apiJob.employer_name ?? "Unknown Company",
    normalizedName: apiJob.employer_name?.toLowerCase().trim() ?? "unknown",
    website: apiJob.employer_website ?? "",
    logo: apiJob.employer_logo ?? "",
    description: apiJob.employer_company_type ?? "",
    location: apiJob.job_city ?? "India",
    isActive: true,
    isExternal: true,
    userId: process.env.SYSTEM_USER_ID,
  };
};

// src/modules/job/job.mapper.js

export const mapJSearchToJob = (apiJob, companyId) => {
  return {
    title: apiJob.job_title ?? "Untitled Position",
    description: apiJob.job_description ?? "",

    // highlights is empty {} for most indian jobs
    // extract from description instead
    requirements: extractRequirements(apiJob),
    skills: extractSkills(apiJob),

    location:
      apiJob.job_location ??
      (apiJob.job_city
        ? `${apiJob.job_city}, ${apiJob.job_state ?? ""}`.trim()
        : "India"),

    industry: apiJob.employer_company_type ?? "General",
    jobType: mapJobType(apiJob.job_employment_types?.[0]), // ← use array not string

    // salary null for most india jobs — default to 0
    salary: {
      min: apiJob.job_min_salary ?? 0,
      max: apiJob.job_max_salary ?? 0,
      currency: "INR",
      period: "year",
    },
    experience: {
      min: 0,
      max: 0,
    },
    position: 1,
    company: companyId,
    applyUrl: apiJob.job_apply_link ?? "",
    isExternal: true,
    externalSource: "jsearch",
    externalId: apiJob.job_id,
    status: "Active",
    created_by: process.env.SYSTEM_USER_ID,
  };
};

// extract requirements from highlights or description
export const extractRequirements = (apiJob) => {
  // try highlights first
  const qualifications = apiJob.job_highlights?.Qualifications ?? [];
  const responsibilities = apiJob.job_highlights?.Responsibilities ?? [];

  if (qualifications.length > 0) return qualifications;
  if (responsibilities.length > 0) return responsibilities;

  // fallback — return empty, show description instead
  return [];
};

// extract skills from required + optional skills in description
export const extractSkills = (apiJob) => {
  const skills = [];

  // from job_required_experience
  if (apiJob.job_required_skills) {
    skills.push(...apiJob.job_required_skills);
  }

  // from highlights qualifications
  const qualifications = apiJob.job_highlights?.Qualifications ?? [];
  qualifications.forEach((q) => {
    // extract tech words
    const techWords = q.match(
      /\b(React|Node|Python|Java|MongoDB|SQL|AWS|Docker|TypeScript|JavaScript|Express|NestJS|Redux|Git)\b/g,
    );
    if (techWords) skills.push(...techWords);
  });

  // deduplicate
  return [...new Set(skills)];
};

const mapJobType = (type) => {
  const map = {
    FULLTIME: "Full-Time",
    PARTTIME: "Part-Time",
    INTERN: "Internship",
    CONTRACTOR: "Contract",
  };
  return map[type] ?? "Full-Time";
};
