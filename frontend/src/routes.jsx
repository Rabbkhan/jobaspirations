import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import JobList from "./pages/jobs/JobList";
import JobDetails from "./pages/jobs/JobDetails";

import CompanyList from "./pages/company/CompanyList";
import CompanyDetails from "./pages/company/CompanyDetails";

import Profile from "./pages/user/Profile";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Home from "./components/common/Home/Home";
import AppliedJobs from "./pages/jobs/AppliedJobs";
import DashboardLayout from "./layouts/DashboardLayout";
import Companycreate from "./pages/company/Companycreate";
import AdminRoute from "./pages/auth/AdminRoute";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Adminjobs from "./pages/jobs/Adminjobs";
import Jobcreate from "./pages/jobs/Jobcreate";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Pages - NO NAVBAR */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />

      {/* Main app pages - WITH NAVBAR */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/jobs"
        element={
          <MainLayout>
            <JobList />
          </MainLayout>
        }
      />

      <Route
        path="/jobs/:id"
        element={
          <MainLayout>
            <JobDetails />
          </MainLayout>
        }
      />
      {/* <Route
        path="/applied-jobs"
        element={
          <MainLayout>
            <AppliedJobs />
          </MainLayout>
        }
      /> */}

      <Route
        path="/profile"
        element={
          <MainLayout>
            <ProtectedRoute>

            <Profile />
            </ProtectedRoute>
          </MainLayout>
        }
      />

      {/* admin routes  */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/admin"
          element={
            <MainLayout>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </MainLayout>
          }
        />

        <Route
          path="/admin/companies"
          element={
            <MainLayout>
              <AdminRoute>
                <CompanyList />
              </AdminRoute>
            </MainLayout>
          }
        />

        <Route
          path="/admin/companies/create"
          element={
            <MainLayout>
              <AdminRoute>
                <Companycreate />
              </AdminRoute>
            </MainLayout>
          }
        />
        <Route
          path="/admin/companies/:id"
          element={
            <MainLayout>
              <AdminRoute>
                <CompanyDetails />
              </AdminRoute>
            </MainLayout>
          }
        />
          <Route
          path="/admin/jobs"
          element={
            <MainLayout>
              <AdminRoute>
                <Adminjobs />
              </AdminRoute>
            </MainLayout>
          }
        />
          <Route
          path="/admin/jobs/create"
          element={
            <MainLayout>
              <AdminRoute>
                <Jobcreate />
              </AdminRoute>
            </MainLayout>
          }
        />
      </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />

    </Routes>
  );
};

export default AppRoutes;
