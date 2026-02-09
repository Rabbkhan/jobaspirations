import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: String,

    password: {
      type: String,
      required: true,
    },

    // models/User.model.js
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordResetAttempts: {
      type: Number,
      default: 0,
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    isFirstLogin: { type: Boolean, default: true },

    isEmailVerified: { type: Boolean, default: false },

    verificationCode: String, // hashed
    emailVerificationExpires: Date,
    verificationAttempts: { type: Number, default: 0 },

    isPhoneVerified: { type: Boolean, default: false },

    profile: {
      bio: { type: String, trim: true },
      skills: [{ type: String, trim: true }],
      resume: String,
      resumeOriginalName: String,
      profilePhoto: { type: String, default: "" },
    },

    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
