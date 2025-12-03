import express from "express";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { authenticate } from "../middlewares/auth.middleware..js";
import { getRecruiterDashboardController } from "../controllers/dashboard.controller.js";

const router = express.Router();

// ✅ Recruiter Dashboard Only
router.get(
  "/recruiter",
  authenticate,
  authorizeRoles("recruiter"),
  getRecruiterDashboardController
);

export default router;
