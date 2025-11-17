import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/statusCodes.js";
import { Company } from "../models/company.model.js";

export const createCompany = async (data, userId) => {
  const existingCompany = await Company.findOne({ name: data.name });

  if (existingCompany) {
    const err = new Error(MESSAGES.COMPANY_EXISTS);
    err.status = STATUS.BAD_REQUEST;
    throw err;
  }

  const company = await Company.create({ ...data, userId });
  return {
    success: true,
    message: MESSAGES.COMPANY_CREATED,
    company,
  };
};

export const getAllCompanies = async (userId) => {
  const companies = await Company.find({userId}).populate("userId", "name email");
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

  await company.deleteOne();
  return { success: true, message: MESSAGES.COMPANY_DELETED};
};
