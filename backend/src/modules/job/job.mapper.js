// ← helpers first, before they are used
const normalizeLocation = (apiJob) => {
  const city = apiJob.job_city?.toLowerCase().trim();
  const location = apiJob.job_location?.toLowerCase().trim();
  const state = apiJob.job_state?.toLowerCase().trim();

  // use city first, fallback to job_location
  const src = city || location || "";

  if (!src || src === "india") return "Pan India";

  // existing cities
  if (src.includes("bangalore") || src.includes("bengaluru"))
    return "Bangalore";
  if (src.includes("hyderabad")) return "Hyderabad";
  if (src.includes("mumbai") || src.includes("bombay")) return "Mumbai";
  if (src.includes("delhi") || src.includes("new delhi")) return "Delhi";
  if (src.includes("chennai") || src.includes("madras")) return "Chennai";
  if (src.includes("pune")) return "Pune";
  if (src.includes("kolkata") || src.includes("calcutta")) return "Kolkata";
  if (src.includes("gurgaon") || src.includes("gurugram")) return "Gurgaon";
  if (src.includes("noida")) return "Noida";
  if (src.includes("ahmedabad")) return "Ahmedabad";
  if (
    src.includes("chandigarh") ||
    src.includes("sahibzada ajit singh nagar") ||
    src.includes("mohali")
  )
    return "Chandigarh";
  if (src.includes("jaipur")) return "Jaipur";
  if (src.includes("indore")) return "Indore";
  if (src.includes("coimbatore") || src.includes("erode")) return "Coimbatore";
  if (src.includes("remote")) return "Remote";

  // West Bengal
  if (
    src.includes("howrah") ||
    src.includes("liluah") ||
    src.includes("dankuni")
  )
    return "Howrah";
  if (src.includes("hooghly")) return "Hooghly";
  if (src.includes("kharagpur")) return "Kharagpur";
  if (src.includes("durgapur")) return "Durgapur";
  if (src.includes("bardhaman") || src.includes("burdwan")) return "Bardhaman";
  if (src.includes("haldia")) return "Haldia";

  // new cities from API
  if (src.includes("thane") || src.includes("navi mumbai")) return "Mumbai";
  if (src.includes("faridabad") || src.includes("haryana")) return "Gurgaon";
  if (
    src.includes("amritsar") ||
    src.includes("ludhiana") ||
    src.includes("punjab")
  )
    return "Chandigarh";
  if (src.includes("nagpur")) return "Nagpur";
  if (
    src.includes("bhubaneswar") ||
    src.includes("odisha") ||
    src.includes("orissa")
  )
    return "Bhubaneswar";
  if (src.includes("goa")) return "Goa";
  if (src.includes("jharkhand") || src.includes("ranchi")) return "Jharkhand";
  if (src.includes("assam") || src.includes("guwahati")) return "Assam";
  if (
    src.includes("andhra") ||
    src.includes("visakhapatnam") ||
    src.includes("vijayawada")
  )
    return "Andhra Pradesh";
  if (src.includes("bihar") || src.includes("patna")) return "Bihar";
  if (
    src.includes("kochi") ||
    src.includes("kerala") ||
    src.includes("thiruvananthapuram")
  )
    return "Kochi";
  if (src.includes("lucknow") || src.includes("uttar pradesh"))
    return "Lucknow";
  if (src.includes("surat") || src.includes("gujarat")) return "Ahmedabad";
  if (src.includes("bhopal") || src.includes("madhya pradesh")) return "Indore";
  if (src.includes("pan india") || src.includes("pan-india"))
    return "Pan India";

  return "Other";
};

const mapIndustry = (companyType) => {
  if (!companyType) return "Other";
  const type = companyType.toLowerCase();
  if (
    type.includes("software") ||
    type.includes("tech") ||
    type.includes("it") ||
    type.includes("saas")
  )
    return "Software / IT Services";
  if (type.includes("product") || type.includes("engineering"))
    return "Product Engineering";
  if (type.includes("mechanical")) return "Mechanical Engineering";
  if (type.includes("electrical")) return "Electrical Engineering";
  if (type.includes("automobile") || type.includes("automotive"))
    return "Automobile / Automotive";
  if (type.includes("civil") || type.includes("construction"))
    return "Civil & Construction Engineering";
  if (
    type.includes("health") ||
    type.includes("pharma") ||
    type.includes("medtech")
  )
    return "Healthcare / MedTech Engineering";
  if (type.includes("telecom")) return "Telecommunications";
  if (type.includes("manufactur"))
    return "Manufacturing / Industrial Engineering";
  if (
    type.includes("energy") ||
    type.includes("power") ||
    type.includes("solar")
  )
    return "Energy / Power / Renewable";
  return "Other";
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

export const mapJSearchToCompany = (apiJob) => {
  const companyName = apiJob.employer_name ?? apiJob.job_publisher ?? null;

  console.log("RAW employer_name:", apiJob.employer_name);
  console.log("RESOLVED companyName:", companyName);
  return {
    companyname: companyName ?? "Unknown Company",
    normalizedName: companyName?.toLowerCase().trim() ?? "unknown",
    website: apiJob.employer_website ?? "",
    logo: apiJob.employer_logo ?? "",
    description: "",
    companyType: apiJob.employer_company_type ?? "",
    location: normalizeLocation(apiJob),
    isActive: true,
    isExternal: true,
    userId: process.env.SYSTEM_USER_ID,
  };
};

export const mapJSearchToJob = (apiJob, companyId) => {
  return {
    title: apiJob.job_title ?? "Untitled Position",
    description: apiJob.job_description ?? "",
    requirements: extractRequirements(apiJob),
    skills: extractSkills(apiJob),
    location: normalizeLocation(apiJob),
    industry: mapIndustry(apiJob.employer_company_type),
    jobType: mapJobType(apiJob.job_employment_types?.[0]),
    salary: {
      min: apiJob.job_min_salary ?? null,
      max: apiJob.job_max_salary ?? null,
      currency: "INR",
      period: "year",
    },
    experience: { min: 0, max: 0 },
    position: 1,
    company: companyId,
    applyUrl: apiJob.job_apply_link ?? "",
    isExternal: true,
    externalSource: "jsearch",
    externalId: apiJob.job_id,
    status: "Active",
    created_by: process.env.SYSTEM_USER_ID,
    postedAt: apiJob.job_posted_at_datetime_utc
      ? new Date(apiJob.job_posted_at_datetime_utc)
      : apiJob.job_posted_at_timestamp
        ? new Date(apiJob.job_posted_at_timestamp * 1000)
        : new Date(),
  };
};

export const extractRequirements = (apiJob) => {
  const qualifications = apiJob.job_highlights?.Qualifications ?? [];
  const responsibilities = apiJob.job_highlights?.Responsibilities ?? [];
  if (qualifications.length > 0) return qualifications;
  if (responsibilities.length > 0) return responsibilities;
  return [];
};

export const extractSkills = (apiJob) => {
  const skills = [];
  if (apiJob.job_required_skills) skills.push(...apiJob.job_required_skills);
  const qualifications = apiJob.job_highlights?.Qualifications ?? [];
  qualifications.forEach((q) => {
    const techWords = q.match(
      /\b(React|Node|Python|Java|MongoDB|SQL|AWS|Docker|TypeScript|JavaScript|Express|NestJS|Redux|Git)\b/g,
    );
    if (techWords) skills.push(...techWords);
  });
  return [...new Set(skills)];
};
