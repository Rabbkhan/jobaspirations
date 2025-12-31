import React, { useEffect, useState } from "react";
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
import {
  APPLICATIONS_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constants";
import axios from "axios";
import { toast } from "sonner";
import { setSingleJob } from "../../features/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const JobDetails = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const disptach = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          disptach(setSingleJob(res.data.job));

          setIsApplied(
            res.data.job.applications.some(
              (app) => app?.applicant?._id === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, disptach, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATIONS_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      console.log(res.data);

      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        disptach(setSingleJob(updateSingleJob)); // help to get realtime applicant count
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
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
                {singleJob?.applications?.length || 0}
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
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`w-full md:w-auto text-primary-foreground cursor-pointer rounded-lg
    ${
      isApplied
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-[#7209b7] hover:bg-[#5f32ad]"
    }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetails;
