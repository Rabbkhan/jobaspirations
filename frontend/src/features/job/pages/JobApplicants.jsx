import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  APPLICATIONS_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constants";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await axios.get(
        `${JOB_API_END_POINT}/${jobId}/applications`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setApplicants(res.data.applicants);
        setJobTitle(res.data.jobTitle);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-bold">Applicants for: {jobTitle}</h2>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applicants.map((app) => (
              <TableRow key={app._id}>
                <TableCell>{app.applicant?.fullname}</TableCell>
                <TableCell>{app.applicant?.email}</TableCell>
                <TableCell>{app.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  {app.applicant?.profile?.skills?.join(", ") || "N/A"}
                </TableCell>

                <TableCell>
                  {app.applicant?.profile?.resume ? (
                    <a
                      href={app.applicant.profile.resume}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </TableCell>

                <TableCell>
               <Select
  defaultValue={app.status}
  onValueChange={async (value) => {
    try {
      console.log("Updating status for:", app._id, value);

      const res = await axios.put(
        `${APPLICATIONS_API_END_POINT}/${app._id}/status`,
        { status: value },
        { withCredentials: true }
      );

      // ✅ Update LOCAL state correctly (not Redux)
      setApplicants((prev) =>
        prev.map((a) =>
          a._id === app._id ? { ...a, status: value } : a
        )
      );
    } catch (err) {
      console.error(
        "Status update failed",
        err?.response?.data || err.message
      );
    }
  }}
>
  <SelectTrigger className="w-32">
    <SelectValue />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="pending">Pending</SelectItem>
    <SelectItem value="accepted">Accepted</SelectItem>
    <SelectItem value="rejected">Rejected</SelectItem>
  </SelectContent>
</Select>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default JobApplicants;
