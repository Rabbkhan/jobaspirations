import express from "express";
import { authenticate, authorizeRoles, upload } from "#middlewares/index.js";
import {
  createCompanyController,
  getAllCompaniesController,
  getCompanyByIdController,
  updateCompanyController,
  deleteCompanyController,
} from "./company.controller.js";
import { companyValidation } from "./company.validation.js";

const router = express.Router();

// ===============================
// 📌 CREATE COMPANY (Recruiter only)
// ===============================
router.post(
  "/create",
  authenticate, // Must be logged in
  authorizeRoles("recruiter"), // Only recruiters & admins allowed
  upload.single("logo"),
  companyValidation, // Validate fields

  createCompanyController
);

// ===============================
// 📌 GET ALL COMPANIES
// ===============================
router.get("/", authenticate, authorizeRoles("recruiter"), getAllCompaniesController);

// ===============================
// 📌 GET SINGLE COMPANY BY ID
// ===============================
router.get("/:id", authenticate, authorizeRoles("recruiter"), getCompanyByIdController);

// ===============================
// 📌 UPDATE COMPANY (Only owner / recruiter)
// ===============================
router.put(
  "/:id",
  authenticate,
  authorizeRoles("recruiter"),
  upload.single("logo"),

  companyValidation, // optional: only if you want validation on update
  updateCompanyController
);

// ===============================
// ❌ DELETE COMPANY (Only owner / recruiter)
// ===============================
router.delete("/:id/status", authenticate, authorizeRoles("recruiter"), deleteCompanyController);

export default router;
