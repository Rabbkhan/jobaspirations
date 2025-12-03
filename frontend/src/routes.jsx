import { Routes, Route } from "react-router-dom";

/* Layouts */
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

/* Route Guards */
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import AdminRoute from "./pages/auth/AdminRoute";

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
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Adminjobs from "./pages/jobs/Adminjobs";
import Jobcreate from "./pages/jobs/Jobcreate";
import Unauthorized from "./pages/Unauthorized";
import StudentRoute from "./pages/auth/StudentRoute";
import GuestOrStudentRoute from "./pages/auth/GuestOrStudentRoute";
import JobApplicants from "./pages/jobs/JobApplicants";
import AdminJobEdit from "./pages/jobs/AdminJobEdit";
import CompanyEdit from "./pages/company/CompanyEdit";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= Guest  ================= */}

      <Route element={<MainLayout />}>
        {/* Home – Guest + Student only */}
        <Route
          path="/"
          element={
            <GuestOrStudentRoute>
              <Home />
            </GuestOrStudentRoute>
          }
        />

        {/* Jobs – Guest + Student only */}
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

        {/* Profile – Student ONLY */}
        <Route
          path="/profile"
          element={
            <StudentRoute>
              <Profile />
            </StudentRoute>
          }
        />
      </Route>

      {/* ================= AUTH ROUTES (NO NAVBAR / NO SIDEBAR) ================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ================= PUBLIC + USER ROUTES (NAVBAR ONLY) ================= */}
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <StudentRoute>
              <Home />
            </StudentRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <StudentRoute>
              <JobList />
            </StudentRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <StudentRoute>
              <JobDetails />
            </StudentRoute>
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
      </Route>

      {/* ================= ADMIN ROUTES (SIDEBAR ONLY) ================= */}
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
        <Route
          path="/admin/jobs/:jobId/applications"
          element={<JobApplicants />}
        />

        <Route path="/admin/jobs" element={<Adminjobs />} />
        <Route path="/admin/jobs/edit/:id" element={<AdminJobEdit />} />

        <Route path="/admin/jobs/create" element={<Jobcreate />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
