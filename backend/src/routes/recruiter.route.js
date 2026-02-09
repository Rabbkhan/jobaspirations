import express from "express";
import {
  applyRecruiterController,
  approveRecruiterController,
  rejectRecruiterController,
} from "../controllers/recruiter.controller.js";
import { authenticate } from "../middlewares/auth.middleware..js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

// Apply to become recruiter
router.post(
  "/apply",
  authenticate,
  upload.single("logo"),
  applyRecruiterController,
);

// Admin approves recruiter
router.patch(
  "/approve/:id",
  authenticate,
  authorizeRoles("admin"),
  approveRecruiterController,
);
router.patch(
  "/recruiter-applications/reject/:id",
  authenticate,
  authorizeRoles("admin"),
  rejectRecruiterController,
);

export default router;
