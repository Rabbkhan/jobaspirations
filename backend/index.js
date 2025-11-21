import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './src/routes/user.routes.js'
import companyRoutes from './src/routes/company.routes.js'
import jobRoutes from './src/routes/job.routes.js'
import connectDb from "./src/config/db.js";

dotenv.config({});

const PORT = process.env.PORT || 3000;
const app = express();


const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// app.get("/", (req, res) => {
//   return res.status(200).json({
//     message: " I am coming from backend!",
//     success: true,
//   });
// });

//middlewares

app.use(express.json()); // passing json data
app.use(express.urlencoded({ extended: true })); // passing form data
app.use(cookieParser()); //cookie parser


// Route prefixes
// app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);

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







