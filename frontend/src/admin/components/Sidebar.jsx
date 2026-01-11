import { NavLink } from "react-router-dom";
import { Home, Users, Briefcase, FileText, Settings } from "lucide-react";

const Sidebar = () => (
  <aside className="w-64 bg-white shadow-md p-4 flex flex-col gap-4">
    <h1 className="text-xl font-bold">Admin Panel</h1>
    <NavLink to="/admin/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-primary/10">
      <Home size={18} /> Dashboard
    </NavLink>
    <NavLink to="/admin/recruiters" className="flex items-center gap-2 p-2 rounded hover:bg-primary/10">
      <Users size={18} /> Recruiters
    </NavLink>
    <NavLink to="/admin/blogs" className="flex items-center gap-2 p-2 rounded hover:bg-primary/10">
      <FileText size={18} /> Blogs
    </NavLink>
    <NavLink to="/admin/jobs" className="flex items-center gap-2 p-2 rounded hover:bg-primary/10">
      <Briefcase size={18} /> Jobs
    </NavLink>
    <NavLink to="/admin/users" className="flex items-center gap-2 p-2 rounded hover:bg-primary/10">
      <Users size={18} /> Users
    </NavLink>
    <NavLink to="/admin/settings" className="flex items-center gap-2 p-2 rounded hover:bg-primary/10">
      <Settings size={18} /> Settings
    </NavLink>
  </aside>
);

export default Sidebar;
