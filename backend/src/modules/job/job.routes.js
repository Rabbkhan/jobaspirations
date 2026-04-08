import express from "express";
import { authenticate, adminAuthenticate, authorizeRoles } from "#middlewares/index.js";
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

import { createJobValidation, updateJobValidation } from "./jobValidation.js";

const router = express.Router();

router.post("/sync", adminAuthenticate, authorizeRoles("admin"), triggerJobSync);

router.get("/filters", getJobFiltersController);
router.get("/", getAllJobsController);
router.post(
  "/create",
  authenticate,
  authorizeRoles("recruiter"),
  createJobValidation,
  createJobController
);
router.get("/getrecruiterJobs", authenticate, authorizeRoles("recruiter"), getAdminJobsController);
router.get(
  "/:jobId/applications",
  authenticate,
  authorizeRoles("recruiter"),
  getJobApplicantsController
);
router.get("/:id", getJobByIdController);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("recruiter"),
  updateJobValidation,
  updateJobController
);
router.delete("/:id", authenticate, authorizeRoles("recruiter"), deleteJobController);

export default router;
