import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllAdminJobs from "@/shared/hooks/useGetAllAdminJobs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { removeAdminJob } from "@/features/jobSlice";
const AdminJobs = () => {
  useGetAllAdminJobs();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { allAdminJobs } = useSelector((store) => store.job || {});

  const filteredJobs = allAdminJobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const deleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/${jobId}`, {
        withCredentials: true,
      });

      dispatch(removeAdminJob(jobId)); // ✅ Instantly update UI

      if (res.data.success) {
        toast.success(res?.data?.message);

        // ✅ Remove deleted job from UI immediately
      }
    } catch (error) {
      console.log("Delete job error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Jobs</h1>

        <Link to="/recruiter/jobs/create">
          <Button className="flex gap-2">
            <Plus size={18} /> Create Job
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between border">
        <Input
          placeholder="Search job titles..."
          className="w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3">
          <select className="border rounded-lg p-2">
            <option>All Types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>

          <select className="border rounded-lg p-2">
            <option>Status</option>
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>
      </Card>

      {/* Jobs Table */}
      <Card className="p-0 border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Applicants</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job._id} className="hover:bg-muted/40">
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company?.companyname}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{job?.jobType}</Badge>
                </TableCell>
                {/* <TableCell>
                  <Badge
                    className={
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {job?.status}
                  </Badge>
                </TableCell> */}
                <TableCell>
                  <Link to={`/recruiter/jobs/${job._id}/applications`}>
                    <Button size="sm" variant="outline">
                      View ({job.applications?.length || 0})
                    </Button>
                  </Link>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <Link to={`/recruiter/jobs/edit/${job._id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex gap-1"
                      >
                        <Edit size={16} />
                        Edit
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex gap-1"
                      onClick={() => deleteJob(job._id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {filteredJobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminJobs;
