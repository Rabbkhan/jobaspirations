import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Building2, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-sidebar border-r border-sidebar-border p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8 text-sidebar-foreground">
          Admin Panel
        </h1>

        <nav className="space-y-4 text-sidebar-foreground">
          <Link to="/admin" className="block hover:text-primary">
            Dashboard
          </Link>
          <Link to="/admin/companies" className="block hover:text-primary">
            Companies
          </Link>
          <Link to="/admin/jobs" className="block hover:text-primary">
            Jobs
          </Link>
          <Link to="/admin/applicants" className="block hover:text-primary">
            Applicants
          </Link>
        </nav>
      </aside> */}

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navbar */}
        <header className="border-b border-border bg-card p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard Overview</h2>
          <Button className="bg-primary text-primary-foreground">
            Settings
          </Button>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Total Users</CardTitle>
                <Users className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent className="text-3xl font-bold">1,245</CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Total Jobs</CardTitle>
                <Briefcase className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent className="text-3xl font-bold">320</CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Active Companies</CardTitle>
                <Building2 className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent className="text-3xl font-bold">45</CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>New Applicants</CardTitle>
                <BarChart2 className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent className="text-3xl font-bold">88</CardContent>
            </Card>
          </div>

          {/* Recent Applications Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-border">
                    <th className="py-2">Name</th>
                    <th className="py-2">Job</th>
                    <th className="py-2">Applied On</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2">Aarav Sharma</td>
                    <td className="py-2">Frontend Developer</td>
                    <td className="py-2">2 Feb 2025</td>
                    <td className="py-2 text-green-600">Reviewed</td>
                  </tr>

                  <tr className="border-b border-border">
                    <td className="py-2">Priya Verma</td>
                    <td className="py-2">UI/UX Designer</td>
                    <td className="py-2">1 Feb 2025</td>
                    <td className="py-2 text-yellow-600">Pending</td>
                  </tr>

                  <tr>
                    <td className="py-2">Rahul Mehta</td>
                    <td className="py-2">Backend Developer</td>
                    <td className="py-2">30 Jan 2025</td>
                    <td className="py-2 text-red-600">Rejected</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
