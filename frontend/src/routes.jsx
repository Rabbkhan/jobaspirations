import { Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

/* Route Guards */
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import StudentRoute from "./pages/auth/StudentRoute";
import GuestOrStudentRoute from "./pages/auth/GuestOrStudentRoute";

/* Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./components/common/Home/Home";
import JobList from "./pages/jobs/JobList";
import JobDetails from "./pages/jobs/JobDetails";
import Profile from "./pages/user/Profile";
import CompanyList from "./pages/company/CompanyList";
import CompanyDetails from "./pages/company/CompanyDetails";
import Companycreate from "./pages/company/Companycreate";
import CompanyEdit from "./pages/company/CompanyEdit";
import Adminjobs from "./pages/jobs/Adminjobs";
import Jobcreate from "./pages/jobs/Jobcreate";
import JobApplicants from "./pages/jobs/JobApplicants";
import AdminJobEdit from "./pages/jobs/AdminJobEdit";
import Unauthorized from "./pages/Unauthorized";
import Privacypolicy from "./pages/Privacypolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import HireTalent from "./pages/hire/HireTalent";

/* Recruiter flow */
import AppliedJobs from "./pages/jobs/AppliedJobs";
import CareerGuidance from "./pages/CareerGuidance";
import ConsultancyCommingSoon from "./pages/ConsultancyCommingSoon";
import RecruiterDashboard from "./pages/dashboard/RecruiterDashboard";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Blogs from "./admin/pages/Blogs";
import Recruiters from "./admin/pages/Recruiter";
import Dashboard from "./admin/pages/Dashboard";
import Jobs from "./admin/pages/Jobs";
import Users from "./admin/pages/Users";
import Settings from "./admin/pages/Settings";
import AdminLogin from "./admin/pages/Adminlogin";
import RecruiterRoute from "./pages/auth/RecruiterRoute ";
import AdminRoute from "./pages/auth/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import BlogCategories from "./admin/pages/Blogcategories";
import BlogEditorPage from "./admin/pages/BlogEditorPage";
import Blogpage from "./pages/BlogsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
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
          <Route path="jobs" element={<Adminjobs />} />
          <Route path="jobs/create" element={<Jobcreate />} />
          <Route path="jobs/edit/:id" element={<AdminJobEdit />} />
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
