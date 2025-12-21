import mongoose from "mongoose";

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

    requirements: [{ type: String }],

    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    experienceLevel: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
      enum: ["Bangalore", "Hyderabad", "Remote"],
    },

    industry: {
      type: String,
      required: true,
      enum: ["IT", "Finance", "Healthcare"],
    },

    jobType: {
      type: String,
      required: true,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
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
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
