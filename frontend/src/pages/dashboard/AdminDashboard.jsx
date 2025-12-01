import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  // ✅ Dummy Data
  const stats = {
    totalJobs: 12,
    totalApplicants: 138,
    activeCompanies: 6,
  };

  const recentApplicants = [
    {
      id: 1,
      name: "Aarav Sharma",
      job: "Frontend Developer",
      date: "02 Feb 2025",
      status: "pending",
    },
    {
      id: 2,
      name: "Priya Verma",
      job: "UI/UX Designer",
      date: "01 Feb 2025",
      status: "accepted",
    },
    {
      id: 3,
      name: "Rahul Mehta",
      job: "Backend Developer",
      date: "30 Jan 2025",
      status: "rejected",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">

      {/* ✅ TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Total Jobs</CardTitle>
            <Briefcase className="w-6 h-6 text-primary" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.totalJobs}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Total Applicants</CardTitle>
            <Users className="w-6 h-6 text-primary" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.totalApplicants}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Active Companies</CardTitle>
            <Building2 className="w-6 h-6 text-primary" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.activeCompanies}
          </CardContent>
        </Card>
      </div>

      {/* ✅ RECENT APPLICANTS TABLE */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Applicants</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>

        <CardContent>
          <table className="w-full text-sm border">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Name</th>
                <th className="text-left py-2 px-3">Job</th>
                <th className="text-left py-2 px-3">Applied On</th>
                <th className="text-left py-2 px-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentApplicants.map((app) => (
                <tr key={app.id} className="border-b hover:bg-muted">
                  <td className="py-2 px-3">{app.name}</td>
                  <td className="py-2 px-3">{app.job}</td>
                  <td className="py-2 px-3">{app.date}</td>
                  <td className="py-2 px-3">
                    <Badge
                      className={
                        app.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : app.status === "accepted"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }
                    >
                      {app.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
};

export default AdminDashboard;
