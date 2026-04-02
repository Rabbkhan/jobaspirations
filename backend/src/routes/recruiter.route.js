import express from "express";
import {
  applyRecruiterController,
  approveRecruiterController,
  getRecruiterApplicationsController,
  rejectRecruiterController,
} from "../controllers/recruiter.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.js";
import { adminAuthenticate } from "../middlewares/admin.middleware.js";

const router = express.Router();

// Apply to become recruiter
router.post(
  "/apply",
  adminAuthenticate,
  upload.single("logo"),
  applyRecruiterController,
);
router.get(
  "/",
  adminAuthenticate,
  authorizeRoles("admin"),
  getRecruiterApplicationsController,
);
// Admin approves recruiter
router.patch(
  "/approve/:id",
  adminAuthenticate,
  authorizeRoles("admin"),
  approveRecruiterController,
);
router.patch(
  "/reject/:id",
  adminAuthenticate,
  authorizeRoles("admin"),
  rejectRecruiterController,
);

export default router;
