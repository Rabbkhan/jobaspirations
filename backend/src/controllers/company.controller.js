import { validationResult } from "express-validator";
import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from "../services/company.service.js";
import { STATUS } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

export const createCompanyController = async (req, res) => {
  try {
    // Validate inputs from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(STATUS.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }

    // JWT middleware should inject req.user
    const userId = req.user?.id;
    if (!userId) {
      return res.status(STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.UNAUTHORIZED,
      });
    }

    // Service layer handles logic
const result = await createCompany(req.body, userId, req.file);

    return res.status(STATUS.CREATED).json(result);
  } catch (error) {
    console.error("Company Create Error:", error);

    return res.status(error.status || STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};



// ========================
// 📋 GET ALL COMPANIES
// ========================
export const getAllCompaniesController = async (req, res) => {
  try {
        const userId = req.user.id;  

    const result = await getAllCompanies(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Get Companies Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};

// ========================
// 🔍 GET COMPANY BY ID
// ========================
export const getCompanyByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCompanyById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Get Company Error:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};

// ========================
// ✏️ UPDATE COMPANY
// ========================
export const updateCompanyController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await updateCompany(id, req.body, userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Update Company Error:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};

// ========================
// ❌ DELETE COMPANY
// ========================
export const deleteCompanyController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await deleteCompany(id, userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Delete Company Error:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};