import express from "express";
import { authenticate, authorizeRoles } from "#middlewares/index.js";
import {
  getSavedJobsController,
  saveJobController,
  unsaveJobController,
} from "./savedJobs.controller.js";

const router = express.Router();

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

export default router;
