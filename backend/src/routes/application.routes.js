// routes/application.routes.js
import express from "express";
import { authenticate } from "../middlewares/auth.middleware..js";

import {
  applyForJobController,
  getMyApplicationsController,
  updateApplicationStatusController
} from "../controllers/application.controller.js";

const router = express.Router();

// Apply for job
router.post("/apply/:jobId", authenticate, applyForJobController);

// Get my applications
router.get("/mine", authenticate, getMyApplicationsController);


// Update application status
router.put("/:appId/status", authenticate, updateApplicationStatusController);

export default router;
