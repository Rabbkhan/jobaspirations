import React, { useEffect, useState } from "react";
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
import { APPLICATIONS_API_END_POINT } from "../../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobapplied } from "../../features/jobSlice";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const AppliedJobs = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { jobapplied } = useSelector((store) => store.job);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${APPLICATIONS_API_END_POINT}/mine?page=${page}&limit=10`,
          {
            withCredentials: true,
          }
        );

        // console.log("Applied Jobs API FULL:", res.data);

        if (res?.data?.success) {
          dispatch(setJobapplied(res.data.applications || []));
          setTotalPages(res.data.pagination?.totalPages || 1);
        }
      } catch (error) {
        console.log("Applied jobs error:", error?.response?.data || error);
      }
    };

    fetchAppliedJobs();
  }, [page]);

  const filteredJobs = jobapplied?.filter((job) =>
    statusFilter === "All" ? true : job.status === statusFilter
  );

  return (
    <>
      <Card className="shadow-xl border">
        <CardHeader className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Applied Jobs</h2>
          <Select onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue
                placeholder="Filter by Status"
                value={statusFilter}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
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
  <AnimatePresence mode="wait">
    {filteredJobs?.map((item) => (
      <motion.tr
        key={item._id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="border-b"
      >
        <TableCell>{item?.job?.title}</TableCell>

        <TableCell>
          {item?.job?.company?.companyname || "N/A"}
        </TableCell>

        <TableCell>{item?.job?.jobType}</TableCell>

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

        <TableCell>
          {new Date(item?.createdAt).toLocaleDateString("en-IN")}
        </TableCell>
      </motion.tr>
    ))}
  </AnimatePresence>
</TableBody>



          </Table>
        </CardContent>

        {/* pagination button  */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              ← Prev
            </Button>
          </motion.div>

          <span className="text-sm font-medium">
            {page} / {totalPages}
          </span>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next →
            </Button>
          </motion.div>
        </div>
      </Card>
    </>
  );
};

export default AppliedJobs;
