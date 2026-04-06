import express from "express";
import { authenticate, authorizeRoles } from "#middlewares/index.js";
import {
  applyForJobController,
  getMyApplicationsController,
  updateApplicationStatusController,
} from "./application.controller.js";

const router = express.Router();

/* ================= STUDENT ONLY ================= */

// Apply for a job (STUDENT ONLY)
router.post(
  "/apply/:jobId",
  authenticate,
  authorizeRoles("student"),
  // requireEmailVerified,
  applyForJobController,
);

// Get my applications (STUDENT ONLY)
router.get(
  "/mine",
  authenticate,
  authorizeRoles("student"),
  getMyApplicationsController,
);

/* ================= RECRUITER ONLY ================= */

// Update application status (RECRUITER ONLY)
router.put(
  "/:appId/status",
  authenticate,
  authorizeRoles("recruiter"),
  updateApplicationStatusController,
);

export default router;
