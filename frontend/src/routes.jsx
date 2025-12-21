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
import BecomeRecruiter from "./pages/BecomeRecruiter";

/* Recruiter flow */
import RecruiterApply from "./pages/RecruiterApply";
import RecruiterPending from "./pages/RecruiterPending";
import BlogComingSoon from "./pages/BlogComingSoon";
import AppliedJobs from "./pages/jobs/AppliedJobs";
import CareerGuidance from "./pages/CareerGuidance";
import ConsultancyCommingSoon from "./pages/ConsultancyCommingSoon";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= AUTH (NO NAV / SIDEBAR) ================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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


        {/* Hiring */}
        <Route path="/hire" element={<HireTalent />} />
        <Route path="/become-recruiter" element={<BecomeRecruiter />} />

        {/* Recruiter apply flow */}
        <Route
          path="/recruiter/apply"
          element={
            <ProtectedRoute>
              <RecruiterApply />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/pending"
          element={
            <ProtectedRoute>
              <RecruiterPending />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ================= ADMIN / RECRUITER DASHBOARD ================= */}
      <Route
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/companies" element={<CompanyList />} />
        <Route path="/admin/companies/create" element={<Companycreate />} />
        <Route path="/admin/companies/:id" element={<CompanyDetails />} />
        <Route path="/admin/companies/edit/:id" element={<CompanyEdit />} />

        <Route path="/admin/jobs" element={<Adminjobs />} />
        <Route path="/admin/jobs/create" element={<Jobcreate />} />
        <Route path="/admin/jobs/edit/:id" element={<AdminJobEdit />} />
        <Route
          path="/admin/jobs/:jobId/applications"
          element={<JobApplicants />}
        />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
