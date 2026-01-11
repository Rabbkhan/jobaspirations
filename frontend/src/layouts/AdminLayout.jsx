import { Outlet } from "react-router-dom";
import Sidebar from "../admin/components/Sidebar";
import Navbar from "../admin/components/Navbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar className="h-16" />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
