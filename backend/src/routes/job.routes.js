import express from "express";
import { authenticate } from "../middlewares/auth.middleware..js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

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

import {
  getSavedJobsController,
  saveJobController,
  unsaveJobController,
} from "../controllers/savedJobs.controller.js";

import { jobValidation } from "../validations/jobValidation.js";

const router = express.Router();

/* ===================== SAVED JOBS (MUST BE FIRST) ===================== */

router.get(
  "/saved",
  authenticate,
  authorizeRoles("student"),
  getSavedJobsController
);

router.post(
  "/save/:jobId",
  authenticate,
  authorizeRoles("student"),
  saveJobController
);

router.delete(
  "/unsave/:jobId",
  authenticate,
  authorizeRoles("student"),
  unsaveJobController
);

/* ===================== OTHER STATIC ROUTES ===================== */

router.get("/filters", getJobFiltersController);

router.get("/", getAllJobsController);

router.post(
  "/create",
  authenticate,
  authorizeRoles("recruiter"),
  jobValidation,
  createJobController
);

router.get(
  "/getadminJobs",
  authenticate,
  authorizeRoles("recruiter"),
  getAdminJobsController
);

router.get(
  "/:jobId/applications",
  authenticate,
  authorizeRoles("recruiter"),
  getJobApplicantsController
);

/* ===================== DYNAMIC ROUTES (ALWAYS LAST) ===================== */

router.get("/:id", getJobByIdController);

router.put(
  "/:id",
  authenticate,
  jobValidation,
  authorizeRoles("recruiter"),
  updateJobController
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("recruiter"),
  deleteJobController
);

export default router;
