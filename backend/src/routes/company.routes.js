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
import { upload } from "../middlewares/multer.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// ===============================
// 📌 CREATE COMPANY (Recruiter only)
// ===============================
router.post(
  "/create",
  authenticate, // Must be logged in
   authorizeRoles("recruiter"),  // Only recruiters & admins allowed
  upload.single("logo"),
  companyValidation, // Validate fields

  createCompanyController
);

// ===============================
// 📌 GET ALL COMPANIES
// ===============================
router.get("/", authenticate, authorizeRoles("recruiter"),  getAllCompaniesController);

// ===============================
// 📌 GET SINGLE COMPANY BY ID
// ===============================
router.get("/:id", authenticate, authorizeRoles("recruiter"),  getCompanyByIdController);

// ===============================
// 📌 UPDATE COMPANY (Only owner / recruiter)
// ===============================
router.put(
  "/:id",
  authenticate,
   authorizeRoles("recruiter"), 
  companyValidation, // optional: only if you want validation on update
  updateCompanyController
);

// ===============================
// ❌ DELETE COMPANY (Only owner / recruiter)
// ===============================
router.delete("/:id", authenticate, authorizeRoles("recruiter"),  deleteCompanyController);

export default router;
