import dotenv from "dotenv";
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from './src/routes/user.routes.js'
import companyRoutes from './src/routes/company.routes.js'
import jobRoutes from './src/routes/job.routes.js'
import connectDb from "./src/config/db.js";
import applicationRoutes from './src/routes/application.routes.js'
import dashboardRoutes from "./src/routes/dashboard.route.js";


const PORT = process.env.PORT || 3000;
const app = express();


const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_LIVE,
  process.env.FRONTEND_URL_LIVE_WWW,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server, Postman, etc.
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.get("/", (req, res) => {
  return res.status(200).json({
    message: " I am coming from backend!",
    success: true,
  });
});

//middlewares

app.use(express.json()); // passing json data
app.use(express.urlencoded({ extended: true })); // passing form data
app.use(cookieParser()); //cookie parser


// Route prefixes
// app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


// http://localhost:8000/api/v1/auth/register




// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});



// ✅ Start server after DB connection
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => console.log(`✅ Server running at port ${PORT}`));
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();







