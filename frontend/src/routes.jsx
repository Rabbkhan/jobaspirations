import { Routes, Route } from "react-router-dom";

/* Layouts */
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

/* Route Guards */
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import AdminRoute from "./pages/auth/AdminRoute";
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
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Adminjobs from "./pages/jobs/Adminjobs";
import Jobcreate from "./pages/jobs/Jobcreate";
import JobApplicants from "./pages/jobs/JobApplicants";
import AdminJobEdit from "./pages/jobs/AdminJobEdit";
import Unauthorized from "./pages/Unauthorized";
import Privacypolicy from "./pages/Privacypolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import HireTalent from "./pages/hire/HireTalent";

/* Recruiter flow */
import BlogComingSoon from "./pages/BlogComingSoon";
import AppliedJobs from "./pages/jobs/AppliedJobs";
import CareerGuidance from "./pages/CareerGuidance";
import ConsultancyCommingSoon from "./pages/ConsultancyCommingSoon";
import RecruiterDashboard from "./pages/dashboard/RecruiterDashboard";
import VerifyEmail from "./pages/auth/VerifyEmail";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= AUTH (NO NAV / SIDEBAR) ================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

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

        {/* Static pages */}
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/blog" element={<BlogComingSoon />} />
        <Route path="/consulting" element={<ConsultancyCommingSoon />} />
            <Route path="/admin" element={<AdminDashboard />} />


        {/* Hiring */}
        <Route path="/hire" element={<HireTalent />} />

        {/* Recruiter apply flow */}
      

        
      </Route>

      {/* ================= ADMIN / RECRUITER DASHBOARD ================= */}
      <Route
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >

        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/recruiter/companies" element={<CompanyList />} />
        <Route path="/recruiter/companies/create" element={<Companycreate />} />
        <Route path="/recruiter/companies/:id" element={<CompanyDetails />} />
        <Route path="/recruiter/companies/edit/:id" element={<CompanyEdit />} />

        <Route path="/recruiter/jobs" element={<Adminjobs />} />
        <Route path="/recruiter/jobs/create" element={<Jobcreate />} />
        <Route path="/recruiter/jobs/edit/:id" element={<AdminJobEdit />} />
        <Route
          path="/recruiter/jobs/:jobId/applications"
          element={<JobApplicants />}
        />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
