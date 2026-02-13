import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { DASHBOARD_API_END_POINT } from "@/utils/constants";

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    activeCompanies: 0,
  });

  const [recentApplicants, setRecentApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `${DASHBOARD_API_END_POINT}/recruiter`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setStats(res.data.stats);
          setRecentApplicants(res.data.recentApplicants);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-sm">Loading dashboard...</div>;
  }

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
              {recentApplicants.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted-foreground">
                    No recent applicants found
                  </td>
                </tr>
              ) : (
                recentApplicants.map((app) => (
                  <tr key={app._id} className="border-b hover:bg-muted">
                    <td className="py-2 px-3">
                      {app.applicant?.fullname}
                    </td>

                    <td className="py-2 px-3">
                      {app.job?.title}
                    </td>

                    <td className="py-2 px-3">
                      {new Date(app.createdAt).toLocaleDateString("en-IN")}
                    </td>

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
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
};

export default RecruiterDashboard;
