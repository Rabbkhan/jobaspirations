import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyname: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    employees: {
      type: Number,
      default: 0,
    },
    logo: {
      type: String, // URL to company logo
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    normalizedName: {
      type: String,
      default: "",
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const Company = mongoose.model("Company", companySchema);
