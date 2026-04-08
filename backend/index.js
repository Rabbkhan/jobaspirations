/**
 * index.js
 * Production-safe bootstrap
 * Zero side-effects, deterministic startup
 */

/* ===========================
   1. LOAD ENV — FIRST, ALWAYS
   =========================== */

import dotenv from "dotenv";
import path from "path";

// Decide environment BEFORE reading any env values
const isProduction = process.env.NODE_ENV === "production" || process.env.FORCE_PROD === "true";

// Load correct env file
dotenv.config({
  path: isProduction ? path.resolve("./.env.production") : path.resolve("./.env.development"),
});

/* ===========================
   2. IMPORTS (SAFE NOW)
   =========================== */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Routes
import userRoutes from "./src/modules/auth/user.routes.js";
import companyRoutes from "./src/modules/company/company.routes.js";
import jobRoutes from "./src/modules/job/job.routes.js";
import applicationRoutes from "./src/modules/application/application.routes.js";
import dashboardRoutes from "./src/modules/dashboard/dashboard.routes.js";
import adminblogRoutes from "./src/modules/blog/admin.blog.routes.js";
import BlogcategoryRoutes from "./src/modules/blog-category/category.routes.js";
import publicblogRoutes from "./src/modules/blog/blog.routes.js";
import RecruiterRoutes from "./src/modules/recruiter/recruiter.routes.js";
import JobsavedRoutes from "./src/modules/saved-jobs/savedjob.routes.js";
import reviewRoutes from "./src/review/review.routes.js";

// Infrastructure
import connectDb from "./src/config/db.js";
import { FRONTEND_URL, FRONTEND_ALLOWED_ORIGINS } from "./src/config/env.js";
import { globalErrorHandler } from "./src/middlewares/error.middleware.js";
import { initCronJobs } from "./src/config/cron.js";
import { sanitizeRequest } from "#middlewares/sanitize.middleware.js";

/* ===========================
   3. HARD ENV VALIDATION
   =========================== */

const PORT = Number(process.env.PORT);

if (!PORT) {
  console.error("❌ FATAL: PORT is not defined");
  process.exit(1);
}

if (!FRONTEND_URL) {
  console.error("❌ FATAL: FRONTEND_URL is not defined");
  process.exit(1);
}

if (!Array.isArray(FRONTEND_ALLOWED_ORIGINS) || FRONTEND_ALLOWED_ORIGINS.length === 0) {
  console.error("❌ FATAL: FRONTEND_ALLOWED_ORIGINS is empty");
  process.exit(1);
}

// Log boot config ONCE (do not remove)
if (process.env.NODE_ENV !== "production") {
  console.log("🧪 Boot configuration (dev):", {
    NODE_ENV: process.env.NODE_ENV,
    FORCE_PROD: process.env.FORCE_PROD,
    PORT,
    FRONTEND_ALLOWED_ORIGINS,
  });
} else {
  console.log("🚀 Server starting in production mode");
}

/* ===========================
   4. EXPRESS APP
   =========================== */

const app = express();

/* ===========================
   5. CORS — SAFE, NON-CRASHING
   =========================== */

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow curl, server-to-server, health checks
      if (!origin) return callback(null, true);

      if (FRONTEND_ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      // Reject cleanly — DO NOT THROW
      return callback(null, false);
    },
    credentials: true,
  })
);

/* ===========================
   6. MIDDLEWARES
   =========================== */

app.use(helmet());
app.use(sanitizeRequest);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(cookieParser());
// app.set('trust proxy', 1) // uncomment when Cloudflare added

const csrfGuard = (req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const hasSessionCookie = Boolean(req.cookies?.token || req.cookies?.admin_token);
  if (!hasSessionCookie) return next();

  const origin = req.headers.origin;
  if (!origin || FRONTEND_ALLOWED_ORIGINS.includes(origin)) return next();

  return res.status(403).json({
    success: false,
    message: "Blocked by origin policy",
  });
};
app.use(csrfGuard);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { success: false, message: "Too many requests" },
  standardHeaders: true,
  legacyHeaders: false,
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many attempts" },
  standardHeaders: true,
  legacyHeaders: false,
});

/* ===========================
   7. HEALTH CHECK (NGINX SAFE)
   =========================== */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    uptime: process.uptime(),
  });
});

/* ===========================
   8. ROUTES
   =========================== */

app.use("/api", globalLimiter); // global limit

app.use("/api/v1/user/login", authLimiter); // auth limits
app.use("/api/v1/user/register", authLimiter);
app.use("/api/v1/user/forgot-password", authLimiter);
app.use("/api/v1/user/reset-password", authLimiter);
app.use("/api/v1/user/verifyemail", authLimiter);
app.use("/api/v1/user/verifyemail/request", authLimiter);
app.use("/api/v1/user/admin/login", authLimiter);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/job", JobsavedRoutes);

app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/adminblog", adminblogRoutes);
app.use("/api/v1/blogcategory", BlogcategoryRoutes);
app.use("/api/v1/blog", publicblogRoutes);
app.use("/api/v1/recruiter-applications", RecruiterRoutes);
app.use("/api/v1/reviews", reviewRoutes); // ADD THIS

// Root sanity check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

/* ===========================
   9. GLOBAL ERROR HANDLER
   =========================== */

app.use(globalErrorHandler);

/* ===========================
   10. START SERVER (DB FIRST)
   =========================== */

const startServer = async () => {
  try {
    await connectDb();
    initCronJobs(); // ← add this

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`✅ Server listening on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup failure:", error);
    process.exit(1);
  }
};

startServer();

/* ===========================
   11. PROCESS SAFETY NETS
   =========================== */

// Crash fast — PM2 should restart
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
  const isProd = process.env.NODE_ENV === "production";
  const timeoutName = reason?.error?.name || reason?.name;
  const isTimeout = timeoutName === "TimeoutError";

  // In development, avoid crashing on transient external timeouts.
  if (!isProd && isTimeout) {
    console.warn("⚠️ Ignoring transient timeout rejection in development");
    return;
  }

  if (isProd) {
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});
