import { Routes, Route, Navigate } from 'react-router-dom'

/* =======================
   Layouts
======================= */
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import AdminLayout from '@/layouts/AdminLayout'

/* =======================
   Route Guards
======================= */
import ProtectedRoute from '@/shared/routes/ProtectedRoute'
import StudentRoute from '@/shared/routes/StudentRoute'
import AdminRoute from '@/shared/routes/AdminRoute'
import GuestOrStudentRoute from '@/shared/routes/GuestOrStudentRoute.jsx'
import RecruiterRoute from '@/shared/routes/RecruiterRoute.jsx' // ✅ fixed typo
/* =======================
   AUTH (Public / Pre-login)
======================= */
import Login from '@/features/auth/pages/Login.jsx'
import Register from '@/features/auth/pages/Register'
import VerifyEmail from '@/features/auth/pages/VerifyEmail'
import ForgotPassword from '@/features/auth/pages/ForgotPassword'
import ResetPassword from '@/features/auth/pages/ResetPassword'

/* =======================
   PUBLIC PAGES (No auth)
======================= */
import Home from '@/pages/home/Home'
import JobList from '@/features/job/pages/JobList'
import JobDetails from '@/features/job/pages/JobDetails'
import BlogsPage from '@/features/blog/public/BlogsPage.jsx'
import BlogDetailsPage from '@/features/blog/public/BlogDetailsPage'
import Privacypolicy from '@/pages/static/Privacypolicy'
import TermsAndConditions from '@/pages/static/TermsAndConditions'
import HireTalent from '@/pages/hire/HireTalent'
import Unauthorized from '@/pages/Unauthorized'

/* =======================
   STUDENT PAGES
======================= */
import Profile from '@/features/profile/pages/ProfilePage'
import AppliedJobs from '@/features/profile/pages/AppliedJobs'
import CareerGuidance from '@/pages/static/CareerGuidance'
import Savedjob from '@/features/job/pages/Savedjobs.jsx'

/* =======================
   RECRUITER PAGES
======================= */
import RecruiterDashboard from '@/features/recruiter/pages/RecruiterDashboard'
import RecruiterJobs from '@/features/recruiter/pages/Recruiterjobs'
import Jobcreate from '@/features/recruiter/pages/Jobcreate'
import RecruiterJobEdit from '@/features/recruiter/pages/RecruiterJobEdit'
import JobApplicants from '@/features/recruiter/pages/JobApplicants'
import CompanyList from '@/features/company/pages/CompanyList'
import CompanyDetails from '@/features/company/pages/CompanyDetails'
import Companycreate from '@/features/company/pages/Companycreate'
import CompanyEdit from '@/features/company/pages/CompanyEdit'
import RecruiterOnboarding from '@/pages/recruiter/RecruiterOnboarding.jsx'
import RecruiterPendingPage from '@/pages/recruiter/RecruiterPendingPage.jsx'
import HireApply from '@/features/recruiter/pages/RecruiterApplyPage.jsx'

/* =======================
   ADMIN PAGES
======================= */
import AdminLogin from '@/features/auth/pages/Adminlogin'
import AdminDashboardPage from '@/features/admin/pages/AdminDashboardPage'
import RecruiterApprovalPage from '@/features/admin/pages/RecruiterApprovalPage'
import Jobs from '@/features/admin/pages/Jobs'
import Users from '@/features/admin/pages/Users'
import Blogs from '@/features/blog/admin/Blogs'
import BlogCategories from '@/features/blog/admin/Blogcategories'
import BlogEditorPage from '@/features/blog/admin/BlogEditorPage'
import Settings from '@/features/admin/pages/Settings'
import PendingApproval from '@/pages/static/PendingApproval.jsx'

const AppRoutes = () => {
    return (
        <Routes>
            {/* ================= AUTH ================= */}
            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/verify-email"
                    element={<VerifyEmail />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />
                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />
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

                {/* ✅ fixed — added StudentRoute guard */}
                <Route
                    path="/profile/saved-jobs"
                    element={
                        <StudentRoute>
                            <Savedjob />
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
                <Route
                    path="/hire"
                    element={<HireTalent />}
                />

                {/* ✅ fixed — added StudentOrGuestRoute to block recruiters */}
                <Route
                    path="/become-recruiter"
                    element={
                        <ProtectedRoute>
                            <GuestOrStudentRoute>
                                <RecruiterOnboarding />
                            </GuestOrStudentRoute>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recruiter-pending"
                    element={
                        <ProtectedRoute>
                            <GuestOrStudentRoute>
                                <RecruiterPendingPage />
                            </GuestOrStudentRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/blogs"
                    element={<BlogsPage />}
                />
                <Route
                    path="/blog/:slug"
                    element={<BlogDetailsPage />}
                />
                <Route
                    path="/privacy-policy"
                    element={<Privacypolicy />}
                />
                <Route
                    path="/terms"
                    element={<TermsAndConditions />}
                />
                <Route
                    path="/career-tips"
                    element={<CareerGuidance />}
                />
            </Route>

            {/* ================= ADMIN LOGIN ================= */}
            <Route
                path="/admin/login"
                element={<AdminLogin />}
            />

            {/* ================= RECRUITER ================= */}
            <Route
                path="/recruiter"
                element={<RecruiterRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route
                        index
                        element={<RecruiterDashboard />}
                    />
                    <Route
                        path="companies"
                        element={<CompanyList />}
                    />
                    <Route
                        path="companies/create"
                        element={<Companycreate />}
                    />
                    <Route
                        path="companies/:id"
                        element={<CompanyDetails />}
                    />
                    <Route
                        path="companies/edit/:id"
                        element={<CompanyEdit />}
                    />
                    <Route
                        path="jobs"
                        element={<RecruiterJobs />}
                    />
                    <Route
                        path="jobs/create"
                        element={<Jobcreate />}
                    />
                    <Route
                        path="jobs/edit/:id"
                        element={<RecruiterJobEdit />}
                    />
                    <Route
                        path="jobs/:jobId/applications"
                        element={<JobApplicants />}
                    />
                </Route>
            </Route>

            {/* ================= ADMIN ================= */}
            <Route
                path="/admin"
                element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                    <Route
                        index
                        element={
                            <Navigate
                                to="dashboard"
                                replace
                            />
                        }
                    />
                    <Route
                        path="dashboard"
                        element={<AdminDashboardPage />}
                    />
                    <Route
                        path="blogs"
                        element={<Blogs />}
                    />
                    <Route
                        path="blog-categories"
                        element={<BlogCategories />}
                    />
                    <Route
                        path="blogs/new"
                        element={<BlogEditorPage />}
                    />
                    <Route
                        path="blogs/:id/edit"
                        element={<BlogEditorPage />}
                    />
                    <Route
                        path="jobs"
                        element={<Jobs />}
                    />
                    <Route
                        path="users"
                        element={<Users />}
                    />
                    <Route
                        path="settings"
                        element={<Settings />}
                    />
                    <Route
                        path="recruiters"
                        element={<RecruiterApprovalPage />}
                    />
                </Route>
            </Route>

            {/* ================= FALLBACK ================= */}
            <Route
                path="/unauthorized"
                element={<Unauthorized />}
            />
        </Routes>
    )
}

export default AppRoutes
