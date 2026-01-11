import dotenv from "dotenv";
import path from "path";

// Decide environment BEFORE reading any env values
const isProduction =
  process.env.NODE_ENV === "production" || process.env.FORCE_PROD === "true";

// Load correct env file
dotenv.config({
  path: isProduction
    ? path.resolve("./.env.production")
    : path.resolve("./.env.development"),
});

import bcrypt from "bcryptjs";
import connectDb from "./config/db.js";
import { User } from "./models/user.model.js";

const seedAdmin = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGODB_URI); // DEBUG LINE

    await connectDb();

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin123@", 10);

    await User.create({
      fullname: "jobaspirations",
      email: "admin@jobportal.com",
      password: hashedPassword,
      role: "admin",
      isApproved: true,
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

seedAdmin();
