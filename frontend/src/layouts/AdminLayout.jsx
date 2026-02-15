import { Outlet } from "react-router-dom";
import AdminSidebar from "@/layouts/components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {/* <Navbar /> */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
