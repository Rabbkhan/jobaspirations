import express from "express";
import { authenticate, authorizeRoles } from "#middlewares/index.js";
import { getRecruiterDashboardController } from "./dashboard.controller.js";

const router = express.Router();

// ✅ Recruiter Dashboard Only
router.get(
  "/recruiter",
  authenticate,
  authorizeRoles("recruiter"),
  getRecruiterDashboardController,
);

export default router;
