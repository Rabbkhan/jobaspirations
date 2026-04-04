import express from "express";
import { authenticate } from "../../middlewares/auth.middleware..js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

import {
  createJobController,
  getAllJobsController,
  getJobByIdController,
  updateJobController,
  deleteJobController,
  getAdminJobsController,
  getJobApplicantsController,
  getJobFiltersController,
  triggerJobSync,
} from "./job.controller.js";

import {
  getSavedJobsController,
  saveJobController,
  unsaveJobController,
} from "../../controllers/savedJobs.controller.js";

import { createJobValidation, updateJobValidation } from "./jobValidation.js";
import { adminAuthenticate } from "../../middlewares/admin.middleware.js";

const router = express.Router();

/* ===================== SAVED JOBS (MUST BE FIRST) ===================== */
// router.post("/sync", authenticate, adminAuthenticate, triggerJobSync);
router.post("/sync", triggerJobSync);

router.get(
  "/saved",
  authenticate,
  authorizeRoles("student"),
  getSavedJobsController,
);

router.post(
  "/save/:jobId",
  authenticate,
  authorizeRoles("student"),
  saveJobController,
);

router.delete(
  "/unsave/:jobId",
  authenticate,
  authorizeRoles("student"),
  unsaveJobController,
);

/* ===================== OTHER STATIC ROUTES ===================== */

router.get("/filters", getJobFiltersController);

router.get("/", getAllJobsController);

router.post(
  "/create",
  authenticate,
  authorizeRoles("recruiter"),
  createJobValidation,
  createJobController,
);

router.get(
  "/getrecruiterJobs",
  authenticate,
  authorizeRoles("recruiter"),
  getAdminJobsController,
);

router.get(
  "/:jobId/applications",
  authenticate,
  authorizeRoles("recruiter"),
  getJobApplicantsController,
);

/* ===================== DYNAMIC ROUTES (ALWAYS LAST) ===================== */

router.get("/:id", getJobByIdController);

router.put(
  "/:id",
  authenticate,
  updateJobValidation,
  authorizeRoles("recruiter"),
  updateJobController,
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("recruiter"),
  deleteJobController,
);

export default router;
