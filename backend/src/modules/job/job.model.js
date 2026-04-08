import mongoose from "mongoose";
import { JOB_TYPES } from "../../constants/job.constants.js";

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
    // ← new
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    salary: {
      min: {
        type: Number,
        default: 0,
        min: 0,
      },
      max: {
        type: Number,
        default: 0,
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
    experience: {
      min: {
        type: Number,
        default: 0,
        min: 0,
      },
      max: {
        type: Number,
        default: 0,
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
      default: "General",
      trim: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: JOB_TYPES,
    },
    position: {
      type: Number,
      default: 1,
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
    postedAt: {
      type: Date,
      default: Date.now,
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
    // ← new external job fields
    applyUrl: {
      type: String,
      default: "",
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
    externalSource: {
      type: String,
      default: "manual",
    },
    externalId: {
      type: String,
      sparse: true,
      unique: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
