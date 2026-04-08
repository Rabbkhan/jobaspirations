import express from "express";
import { authenticate, adminAuthenticate, authorizeRoles, upload } from "#middlewares/index.js";
import {
  applyRecruiterController,
  approveRecruiterController,
  getMyApplicationController,
  getRecruiterApplicationsController,
  rejectRecruiterController,
} from "./recruiter.controller.js";

const router = express.Router();

router.post("/apply", authenticate, upload.single("logo"), applyRecruiterController);
router.get("/my-application", authenticate, getMyApplicationController);
router.get("/", adminAuthenticate, authorizeRoles("admin"), getRecruiterApplicationsController);
router.patch(
  "/approve/:id",
  adminAuthenticate,
  authorizeRoles("admin"),
  approveRecruiterController
);
router.patch("/reject/:id", adminAuthenticate, authorizeRoles("admin"), rejectRecruiterController);

export default router;
