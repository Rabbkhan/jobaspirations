import { Routes, Route, Navigate } from "react-router-dom";

/* =======================
   Layouts
======================= */
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AdminLayout from "@/layouts/AdminLayout";

/* =======================
   Route Guards
======================= */
import ProtectedRoute from "@/pages/auth/ProtectedRoute";
import StudentRoute from "@/pages/auth/StudentRoute";
import AdminRoute from "@/pages/auth/AdminRoute";
import GuestOrStudentRoute from "@/pages/auth/GuestOrStudentRoute";

/* =======================
   AUTH (Public / Pre-login)
======================= */
import Login from "@/features/auth/pages/Login.jsx";
import Register from "@/features/auth/pages/Register";
import VerifyEmail from "@/features/auth/pages/VerifyEmail";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";

/* =======================
   PUBLIC PAGES (No auth)
======================= */
import Home from "@/components/common/Home/Home";
import JobList from "@/pages/jobs/JobList";
import JobDetails from "@/pages/jobs/JobDetails";
import Blogpage from "@/pages/BlogsPage";
import BlogDetailsPage from "@/pages/BlogDetailsPage";
import Privacypolicy from "@/pages/Privacypolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import HireTalent from "@/pages/hire/HireTalent";
import Unauthorized from "@/pages/Unauthorized";

/* =======================
   STUDENT PAGES
======================= */
import Profile from "@/pages/user/Profile";
import AppliedJobs from "@/pages/jobs/AppliedJobs";
import CareerGuidance from "@/pages/CareerGuidance";

/* =======================
   RECRUITER PAGES
======================= */
import RecruiterDashboard from "@/pages/dashboard/RecruiterDashboard";
import Recruiterjobs from "@/pages/jobs/Recruiterjobs";
import Jobcreate from "@/pages/jobs/Jobcreate";
import RecruiterJobsEdit from "@/pages/jobs/RecruiterJobsEdit";
import JobApplicants from "@/pages/jobs/JobApplicants";
import CompanyList from "@/pages/company/CompanyList";
import CompanyDetails from "@/pages/company/CompanyDetails";
import Companycreate from "@/pages/company/Companycreate";
import CompanyEdit from "@/pages/company/CompanyEdit";

/* =======================
   ADMIN PAGES
======================= */
import AdminLogin from "@/admin/pages/Adminlogin";
import Dashboard from "@/admin/pages/Dashboard";
import Recruiters from "@/admin/pages/Recruiter";
import Jobs from "@/admin/pages/Jobs";
import Users from "@/admin/pages/Users";
import Blogs from "@/admin/pages/Blogs";
import BlogCategories from "@/admin/pages/Blogcategories";
import BlogEditorPage from "@/admin/pages/BlogEditorPage";
import Settings from "@/admin/pages/Settings";
import RecruiterRoute from "./pages/auth/RecruiterRoute .jsx";


const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* ================= PUBLIC / STUDENT ================= */}
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <GuestOrStudentRoute>
              <Home />
            </GuestOrStudentRoute>
          }
        />

           <Route
          path="/jobs"
          element={
            <GuestOrStudentRoute>
              <JobList />
            </GuestOrStudentRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <GuestOrStudentRoute>
              <JobDetails />
            </GuestOrStudentRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <StudentRoute>
              <Profile />
            </StudentRoute>
          }
        />

        <Route
          path="/applied_jobs"
          element={
            <StudentRoute>
              <AppliedJobs />
            </StudentRoute>
          }
        />
        {/* ... other public/student routes */}
        <Route path="/blogs" element={<Blogpage />} />
        <Route path="/blog/:slug" element={<BlogDetailsPage />} />
        <Route path="/privacy-policy" element={<Privacypolicy/>} />
                <Route path="/terms" element={<TermsAndConditions/>} />
                <Route path="/career-tips" element={<CareerGuidance/>} />

      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      {/* ================= RECRUITER ================= */}
      <Route path="/recruiter" element={<RecruiterRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="companies" element={<CompanyList />} />
          <Route path="companies/create" element={<Companycreate />} />
          <Route path="companies/:id" element={<CompanyDetails />} />
          <Route path="companies/edit/:id" element={<CompanyEdit />} />
          <Route path="jobs" element={<Recruiterjobs />} />
          <Route path="jobs/create" element={<Jobcreate />} />
          <Route path="jobs/edit/:id" element={<RecruiterJobsEdit />} />
          <Route path="jobs/:jobId/applications" element={<JobApplicants />} />
        </Route>
      </Route>

      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog-categories" element={<BlogCategories />} />
          <Route path="blogs/new" element={<BlogEditorPage />} />
          <Route path="blogs/:id/edit" element={<BlogEditorPage />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="recruiters" element={<Recruiters />} />
        </Route>
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
