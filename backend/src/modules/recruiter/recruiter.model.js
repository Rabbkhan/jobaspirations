import mongoose from "mongoose";

const recruiterApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    companyEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    companyEmailVerified: {
      type: Boolean,
      default: false,
    },

    linkedinProfile: String,
    companyLinkedin: String,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    adminNotes: String,
  },
  { timestamps: true }
);

// ✅ Export the model
export const RecruiterApplication = mongoose.model(
  "RecruiterApplication",
  recruiterApplicationSchema
);
