import mongoose from "mongoose";
import { JOB_TYPES } from "../constants/job.constants.js";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
        trim: true,
      },
    ],

    /* ======================
       SALARY (MIN - MAX)
    ====================== */
    salary: {
      min: {
        type: Number,
        required: true,
        min: 0,
      },
      max: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        default: "INR",
      },
      period: {
        type: String,
        enum: ["month", "year"],
        default: "year",
      },
    },

    /* ======================
       EXPERIENCE (IN MONTHS)
    ====================== */
    experience: {
      min: {
        type: Number,
        required: true,
        min: 0,
      },
      max: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      required: true,
      enum: JOB_TYPES,
    },

    position: {
      type: Number,
      required: true,
      min: 1,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        default: [],
      },
    ],

    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
  },
  { timestamps: true },
);

export const Job = mongoose.model("Job", jobSchema);
