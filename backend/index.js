import dotenv from "dotenv";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from './src/routes/user.routes.js';
import companyRoutes from './src/routes/company.routes.js';
import jobRoutes from './src/routes/job.routes.js';
import applicationRoutes from './src/routes/application.routes.js';
import dashboardRoutes from "./src/routes/dashboard.route.js";
import connectDb from "./src/config/db.js";

// --------------------
// Environment Setup
// --------------------

// Force production flag for safety (VPS can set FORCE_PROD=true)
const isProduction = process.env.NODE_ENV === "production" || process.env.FORCE_PROD === "true";

// Load the correct .env file
const envFile = isProduction
  ? path.resolve("./.env.production")
  : path.resolve("./.env.development");

dotenv.config({ path: envFile });


// --------------------
// Express Setup
// --------------------
const PORT = process.env.PORT || 3000;
const app = express();

// --------------------
// CORS Setup
// --------------------
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_LIVE,
  process.env.FRONTEND_URL_LIVE_WWW,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman, server-to-server

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// --------------------
// Middlewares
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --------------------
// Routes
// --------------------
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Backend is running!",
    success: true,
  });
});

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// --------------------
// Start Server after DB Connection
// --------------------
const startServer = async () => {
  try {
    await connectDb(); // db.js should throw if MONGODB_URI is missing
    app.listen(PORT, () => {
      console.log(`✅ Server running at port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
