// routes/application.routes.js
import express from "express";

import {
  applyForJobController,
  getMyApplicationsController,
  updateApplicationStatusController,
} from "../controllers/application.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { authenticate } from "../middlewares/auth.middleware..js";

const router = express.Router();

/* ================= STUDENT ONLY ================= */

// Apply for a job (STUDENT ONLY)
router.post(
  "/apply/:jobId",
  authenticate,
  authorizeRoles("student"),
  applyForJobController
);

// Get my applications (STUDENT ONLY)
router.get(
  "/mine",
  authenticate,
  authorizeRoles("student"),
  getMyApplicationsController
);

/* ================= RECRUITER ONLY ================= */

// Update application status (RECRUITER ONLY)
router.put(
  "/:appId/status",
  authenticate,
  authorizeRoles("recruiter"),
  updateApplicationStatusController
);

export default router;
