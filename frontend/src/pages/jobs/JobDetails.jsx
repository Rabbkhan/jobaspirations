import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  GlobeIcon,
  UsersIcon,
  LayersIcon,
  ClockIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { JOB_API_END_POINT } from "../../utils/constants";
import axios from "axios";
import { setSingleJob } from "../../features/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const JobDetails = () => {
 
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const disptach = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          disptach(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, disptach, user?._id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Job Details */}
        <div className="lg:w-2/3 w-full">
          <Card className="shadow-lg border border-border rounded-xl">
            <CardHeader className="space-y-2">
              {/* Title */}
              <CardTitle className="text-2xl font-bold text-foreground">
                {singleJob?.title}
              </CardTitle>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {/* Job Type */}
                <span className="flex items-center gap-1">
                  <BriefcaseIcon className="w-4 h-4" />
                  {singleJob?.jobType}
                </span>

                {/* Location */}
                <span className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  {singleJob?.location}
                </span>

                {/* Posted Date */}
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  Posted: {new Date(singleJob?.createdAt).toLocaleDateString()}
                </span>

                {/* Applicants */}
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-4 h-4" />
                  {singleJob?.applications?.length || 0} Applicants
                </span>

                {/* Open positions */}
                <span className="flex items-center gap-1">
                  <LayersIcon className="w-4 h-4" />
                  {singleJob?.position} Opening(s)
                </span>

                {/* Experience */}
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {singleJob?.experienceLevel === 0
                    ? "Fresher"
                    : `${singleJob?.experienceLevel} year(s)`}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Separator />

              {/* Description */}
              <div className="space-y-4 text-sm text-muted-foreground">
                <h3 className="text-lg font-semibold text-foreground">
                  Job Description
                </h3>
                <p>{singleJob?.description}</p>

                <h3 className="text-lg font-semibold text-foreground">
                  Requirements
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {singleJob?.requirements?.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Salary & Apply */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
                <span className="text-lg font-semibold text-foreground">
                  Salary: ₹{singleJob?.salary}
                </span>

                <Button
                  size="lg"
                  className="w-full md:w-auto bg-primary text-primary-foreground"
                >
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Company Details */}
        {/* <div className="lg:w-1/3 w-full">
          <Card className="shadow-lg border border-border rounded-xl space-y-4">
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <img
                  src={job.company.logo}
                  alt="Company Logo"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <h3 className="text-lg font-bold text-foreground">
                  {job.company.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {job.company.description}
                </p>
              </div>

              <Separator />

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4" />
                  <span>{job.company.employees} Employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <GlobeIcon className="w-4 h-4" />
                  <span>{job.company.website}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{job.company.location}</span>
                </div>
              </div>

               <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
                Follow Company
              </Button> *
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default JobDetails;
