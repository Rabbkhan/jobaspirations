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
        path="/companies"
        element={
          <MainLayout>
            <CompanyList />
          </MainLayout>
        }
      />

      <Route
        path="/companies/:id"
        element={
          <MainLayout>
            <CompanyDetails />
          </MainLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />

      <Route
        path="/admin"
        element={
          <MainLayout>
            <AdminDashboard />
          </MainLayout>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
