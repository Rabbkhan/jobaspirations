// routes/job.routes.js
import express from "express";

import { authenticate } from '../middlewares/auth.middleware..js'

import {
  createJobController,
  getAllJobsController,
  getJobByIdController,
  updateJobController,
  deleteJobController,
  getAdminJobsController,
  getJobApplicantsController,
  getJobFiltersController,
} from "../controllers/job.controller.js";
import { jobValidation } from "../validations/jobValidation.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/create", authenticate,  authorizeRoles("recruiter"), jobValidation, createJobController);
router.get("/", getAllJobsController);
router.get("/filters", getJobFiltersController);

router.get("/getadminJobs", authenticate,  authorizeRoles("recruiter"),  getAdminJobsController)
// routes/job.routes.js
router.get("/:jobId/applications", authenticate, authorizeRoles("recruiter"), getJobApplicantsController);

router.get("/:id", getJobByIdController);
router.put("/:id", authenticate, jobValidation,  authorizeRoles("recruiter"),  updateJobController);
router.delete("/:id", authenticate,  authorizeRoles("recruiter"),  deleteJobController);

export default router;
