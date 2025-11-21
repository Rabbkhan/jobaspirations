import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";


const AppliedJobs = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const appliedJobs = [
    {
      title: "Frontend Developer",
      company: "Tech Solutions Pvt Ltd",
      type: "Full-time",
      status: "Applied",
      appliedOn: "2025-11-01",
    },
    {
      title: "Backend Engineer",
      company: "Innovatech",
      type: "Part-time",
      status: "Interview",
      appliedOn: "2025-11-03",
    },
    {
      title: "Full Stack Developer",
      company: "NextGen Labs",
      type: "Contract",
      status: "Rejected",
      appliedOn: "2025-11-05",
    },
  ];

  const filteredJobs = appliedJobs.filter((job) =>
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
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
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
              {filteredJobs.map((job, idx) => (
                <TableRow key={idx}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        job.status === "Applied"
                          ? "bg-primary/10 text-primary"
                          : job.status === "Interview"
                          ? "bg-accent/10 text-accent"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.appliedOn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default AppliedJobs;
