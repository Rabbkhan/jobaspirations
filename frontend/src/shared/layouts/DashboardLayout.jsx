import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import DashboardLoading from "@/components/common/loading/DashboardLoading";

const DashboardLayout = () => {
    
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800); // simulate API fetch
  }, []);

  if (loading) return <DashboardLoading />;
    
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <main className="flex-1 bg-background p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
