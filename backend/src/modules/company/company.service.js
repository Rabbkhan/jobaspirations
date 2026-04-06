import { MESSAGES } from "#constants/messages.js";
import { STATUS } from "#constants/statusCodes.js";
import { Company } from "./company.model.js";
import { uploadToCloud } from "#utils/uploadToCloud.js";

export const createCompany = async (data, userId, file) => {
  if (!userId) {
    const err = new Error("userId is required");
    err.status = 400;
    throw err;
  }

  const existingCompany = await Company.findOne({
    companyname: data.companyname,
  });

  if (existingCompany) {
    const err = new Error("Company already exists");
    err.status = 400;
    throw err;
  }

  // ✅ FIX: store only the URL
  let logoURL = "";
  if (file) {
    const uploaded = await uploadToCloud(file, "image");
    logoURL = uploaded.url;
  }

  const company = await Company.create({
    companyname: data.companyname,
    description: data.description,
    website: data.website,
    location: data.location,
    employees: data.employees,
    logo: logoURL, // ✅ string only
    userId: userId,
  });

  return {
    success: true,
    message: "Company created successfully",
    companyId: company._id,
  };
};

export const getAllCompanies = async (userId) => {
  const companies = await Company.find({ userId }).populate(
    "userId",
    "name email",
  );
  return { success: true, companies };
};

export const getCompanyById = async (id) => {
  const company = await Company.findById(id);
  if (!company) {
    const err = new Error(MESSAGES.COMPANY_NOT_FOUND);
    err.status = STATUS.NOT_FOUND;
    throw err;
  }
  return { success: true, company };
};

export const updateCompany = async (id, data, userId) => {
  const company = await Company.findById(id);
  if (!company) {
    const err = new Error(MESSAGES.COMPANY_NOT_FOUND);
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  if (company.userId.toString() !== userId.toString()) {
    const err = new Error(MESSAGES.CANNOT_EDIT_OTHERS_COMPANY);
    err.status = STATUS.FORBIDDEN;
    throw err;
  }

  Object.assign(company, data);
  await company.save();

  return { success: true, message: MESSAGES.COMPANY_UPDATED, company };
};

export const deleteCompany = async (id, userId) => {
  const company = await Company.findById(id);

  if (!company) {
    const err = new Error(MESSAGES.COMPANY_NOT_FOUND);
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  if (company.userId.toString() !== userId.toString()) {
    const err = new Error(MESSAGES.CANNOT_DELETE_OTHERS_COMPANY);
    err.status = STATUS.FORBIDDEN;
    throw err;
  }

  company.isDeleted = true;
  await company.save();

  return { success: true, message: MESSAGES.COMPANY_DELETED };
};
