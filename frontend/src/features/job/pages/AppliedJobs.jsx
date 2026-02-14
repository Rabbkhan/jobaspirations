import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobapplied } from "@/features/job/jobSlice";
import { APPLICATIONS_API_END_POINT } from "@/utils/constants";

const AppliedJobs = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({}); // cache pages for fast back/forward

  const { jobapplied } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // Fetch applied jobs per page
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (cache[page]) {
        // Load from cache
        dispatch(setJobapplied(cache[page]));
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `${APPLICATIONS_API_END_POINT}/mine?page=${page}&limit=10`,
          { withCredentials: true }
        );

        if (res?.data?.success) {
          dispatch(setJobapplied(res.data.applications || []));
          setTotalPages(res.data.pagination?.totalPages || 1);
          setCache((prev) => ({ ...prev, [page]: res.data.applications || [] }));
        }
      } catch (error) {
        console.error("Applied jobs fetch error:", error?.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [page, cache, dispatch]);

  // Memoized filtered jobs for performance
  const filteredJobs = useMemo(() => {
    if (!jobapplied) return [];
    return statusFilter === "All"
      ? jobapplied
      : jobapplied.filter((job) => job.status === statusFilter);
  }, [jobapplied, statusFilter]);

  // Format date utility
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen w-full bg-muted/20 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="shadow-xl border">
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
            <h2 className="text-xl font-bold">Applied Jobs</h2>
            <Select onValueChange={setStatusFilter} value={statusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied On</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading
                  ? Array.from({ length: 10 }).map((_, idx) => (
                      <TableRow key={idx} className="animate-pulse">
                        <TableCell>
                          <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </TableCell>
                      </TableRow>
                    ))
                  : filteredJobs?.map((item) => (
                      <TableRow key={item._id} className="border-b">
                        <TableCell>{item?.job?.title}</TableCell>
                        <TableCell>{item?.job?.company?.companyname || "N/A"}</TableCell>
                        <TableCell>{item?.job?.jobType || "Full Time"}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : item.status === "accepted"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-red-500/10 text-red-500"
                            }
                          >
                            {item?.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(item?.createdAt)}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </CardContent>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1 || loading}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              ← Prev
            </Button>
            <span className="text-sm font-medium">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages || loading}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next →
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AppliedJobs;
