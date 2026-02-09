"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { USER_API_END_POINT } from "../../utils/constants";
import { setApplications, setApplicationsLoading, updateApplicationStatus } from "../../features/adminAuthSlice";

const Recruiters = () => {
  const dispatch = useDispatch();
  const { applications, applicationsLoading } = useSelector(
    (state) => state.adminAuth
  );

  // Fetch pending recruiter applications
  const fetchApplications = async () => {
    dispatch(setApplicationsLoading(true));
    try {
      const { data } = await axios.get(
        `${USER_API_END_POINT}/recruiter-applications`,
        { withCredentials: true }
      );
      if (data.success) {
        dispatch(setApplications(data.applications));
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to load applications");
    } finally {
      dispatch(setApplicationsLoading(false));
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `${USER_API_END_POINT}/recruiter-applications/approve/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success("Recruiter approved successfully!");
      dispatch(updateApplicationStatus({ applicationId: id, status: "approved" }));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(
        `${USER_API_END_POINT}/recruiter-applications/reject/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success("Recruiter rejected successfully!");
      dispatch(updateApplicationStatus({ applicationId: id, status: "rejected" }));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Rejection failed");
    }
  };

  if (applicationsLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!applications.length)
    return <p className="text-center mt-10">No pending applications</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Recruiter Applications</h2>

      {applications.map((app) => (
        <Card key={app._id}>
          <CardHeader className="flex justify-between items-center">
            <h3 className="font-semibold">{app.userId.fullname}</h3>
            <Badge
              variant={
                app.status === "approved"
                  ? "secondary"
                  : app.status === "rejected"
                  ? "destructive"
                  : "outline"
              }
            >
              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
            </Badge>
          </CardHeader>
          <CardContent className="flex justify-between items-center flex-wrap gap-2">
            <div>
               <p><strong>Name:</strong> {app.userId.fullname}</p>
              <p><strong>Email:</strong> {app.userId.email}</p>
              <p><strong>Phone:</strong> {app.phoneNumber || "-"}</p>
              <p><strong>Company:</strong> {app.companyId.companyname}</p>
              <p><strong>Company Email:</strong> {app.companyEmail || "-"}</p>
              <p><strong>Website:</strong> {app.companyId.website || "-"}</p>
              <p><strong>LinkedIn:</strong> {app.companyLinkedin || "-"}</p>
              <p><strong>Employees:</strong> {app.companyId.employees || "-"}</p>
              <p><strong>Location:</strong> {app.companyId.location || "-"}</p>
            </div>
            {app.status === "pending" && (
              <div className="flex gap-2">
                <Button onClick={() => handleApprove(app._id)}>Approve</Button>
                <Button variant="destructive" onClick={() => handleReject(app._id)}>
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Recruiters;
