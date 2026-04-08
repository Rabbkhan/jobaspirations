import express from "express";
import {
  getApprovedReviewsController,
  getReviewStatsController,
  submitReviewController,
  getMyReviewController,
  getAllReviewsController,
  approveReviewController,
  rejectReviewController,
  deleteReviewController,
  markStudentAsPlacedController,
} from "./review.controller.js";
import { authenticate, authorizeRoles, adminAuthenticate, upload } from "#middlewares/index.js";

const router = express.Router();

// ── Public ──────────────────────────────────────────
router.get("/", getApprovedReviewsController);
router.get("/stats", getReviewStatsController);

// ── Student ──────────────────────────────────────────
router.post(
  "/",
  authenticate,
  authorizeRoles("student"),
  upload.single("offerLetterImage"),
  submitReviewController
);
router.get("/my-review", authenticate, authorizeRoles("student"), getMyReviewController);

// ── Admin ──────────────────────────────────────────
router.get("/admin", adminAuthenticate, authorizeRoles("admin"), getAllReviewsController);
router.patch(
  "/admin/:id/approve",
  adminAuthenticate,
  authorizeRoles("admin"),
  approveReviewController
);
router.patch(
  "/admin/:id/reject",
  adminAuthenticate,
  authorizeRoles("admin"),
  rejectReviewController
);
router.delete("/admin/:id", adminAuthenticate, authorizeRoles("admin"), deleteReviewController);
router.patch(
  "/admin/place/:userId",
  adminAuthenticate,
  authorizeRoles("admin"),
  markStudentAsPlacedController
);

export default router;
