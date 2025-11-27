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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Company = mongoose.model("Company", companySchema);
