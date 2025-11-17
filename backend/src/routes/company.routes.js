import express from "express";
import { authenticate } from "../middlewares/auth.middleware..js";
import {
  createCompanyController,
  getAllCompaniesController,
  getCompanyByIdController,
  updateCompanyController,
  deleteCompanyController,
} from "../controllers/company.controller.js";

import { companyValidation } from "../validations/company.validation.js";

const router = express.Router();

// ===============================
// 📌 CREATE COMPANY (Recruiter only)
// ===============================
router.post(
  "/create",
  authenticate,        // Must be logged in
  companyValidation,   // Validate fields
  createCompanyController
);

// ===============================
// 📌 GET ALL COMPANIES
// ===============================
router.get("/", authenticate, getAllCompaniesController);

// ===============================
// 📌 GET SINGLE COMPANY BY ID
// ===============================
router.get("/:id", authenticate, getCompanyByIdController);

// ===============================
// 📌 UPDATE COMPANY (Only owner / recruiter)
// ===============================
router.put(
  "/:id",
  authenticate,
  companyValidation, // optional: only if you want validation on update
  updateCompanyController
);

// ===============================
// ❌ DELETE COMPANY (Only owner / recruiter)
// ===============================
router.delete("/:id", authenticate, deleteCompanyController);

export default router;





