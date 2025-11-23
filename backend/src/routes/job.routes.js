// routes/job.routes.js
import express from "express";

import { authenticate } from '../middlewares/auth.middleware..js'

import {
  createJobController,
  getAllJobsController,
  getJobByIdController,
  updateJobController,
  deleteJobController,
  getAdminJobsController,
} from "../controllers/job.controller.js";
import { jobValidation } from "../validations/jobValidation.js";

const router = express.Router();

router.post("/create", authenticate, jobValidation, createJobController);
router.get("/", getAllJobsController);
router.get("/getadminJobs", authenticate, getAdminJobsController)
router.get("/:id", getJobByIdController);
router.put("/:id", authenticate,jobValidation, updateJobController);
router.delete("/:id", authenticate, deleteJobController);

export default router;
