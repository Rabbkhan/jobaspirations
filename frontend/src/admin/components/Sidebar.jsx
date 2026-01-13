import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Briefcase,
  FileText,
  Settings,
  Folder,
} from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { admin, loading } = useSelector((state) => state.adminAuth);

  const baseClass = "flex items-center gap-2 p-2 rounded hover:bg-primary/10";
  const activeClass = "bg-primary/10 font-medium";

  console.log(admin)
  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col gap-4">
      {/* Admin Welcome */}
      <h1 className="text-sm font-semibold text-gray-600 mb-2">
        {loading ? "Loading..." : admin ? `Welcome, ${admin.fullname}` : "Not logged in"}
      </h1>

      {/* Dashboard */}
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
      >
        <Home size={18} /> Dashboard
      </NavLink>

      {/* Recruiters */}
      <NavLink
        to="/admin/recruiters"
        className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
      >
        <Users size={18} /> Recruiters
      </NavLink>

      {/* Blog Management */}
      <div className="mt-2">
        <p className="text-xs uppercase text-gray-400 mb-1">Blog Management</p>

        <NavLink
          to="/admin/blogs"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          <FileText size={18} /> All Blogs
        </NavLink>

        <NavLink
          to="/admin/blog-categories"
          className={({ isActive }) => `${baseClass} ml-6 ${isActive ? activeClass : ""}`}
        >
          <Folder size={16} /> Categories
        </NavLink>
      </div>

      {/* Jobs */}
      <NavLink
        to="/admin/jobs"
        className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
      >
        <Briefcase size={18} /> Jobs
      </NavLink>

      {/* Users */}
      <NavLink
        to="/admin/users"
        className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
      >
        <Users size={18} /> Users
      </NavLink>

      {/* Settings */}
      <NavLink
        to="/admin/settings"
        className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
      >
        <Settings size={18} /> Settings
      </NavLink>
    </aside>
  );
};

export default Sidebar;
