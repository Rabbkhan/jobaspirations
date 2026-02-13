import React from "react";
import {
  Bookmark,
  MapPin,
  Briefcase,
  ArrowRight,
  IndianRupee,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { saveJobThunk, unsaveJobThunk } from "@/thunk/SavedJobThunk";
import { useMemo } from "react";
import LatestJobsSkeleton from "../loading/LatestJobsSkeleton";

const LatestJobs = () => {
  const { allJobs, savedJobs, loading } = useSelector((store) => store.job);

  

  const latestSixJobs = useMemo(() => {
    return [...allJobs]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  }, [allJobs]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeAgo = (timestamp) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diff = (now - created) / 1000; // seconds

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return created.toLocaleDateString(); // for older posts
  };

const formatExperience = (experience) => {
  if (!experience || experience.min === 0) return "Fresher";

  const toYearsMonths = (months) => {
    const y = Math.floor(months / 12);
    const m = months % 12;
    return `${y ? `${y}y ` : ""}${m ? `${m}m` : ""}`.trim();
  };

  return `${toYearsMonths(experience.min)} - ${toYearsMonths(experience.max)}`;
};




  const formatSalary = (salary) => {
    if (!salary) return "Not disclosed";

    const format = (n) => `${(n / 100000).toFixed(1)} LPA`;

    if (salary.min === salary.max) return format(salary.min);

    return `${format(salary.min)} – ${format(salary.max)}`;
  };

  const isSaved = (jobId) => savedJobs.some((job) => job._id === jobId);

  const handleSaveToggle = (jobId) => {
    if (isSaved(jobId)) {
      dispatch(unsaveJobThunk(jobId));
    } else {
      dispatch(saveJobThunk(jobId));
    }
  };

  if (loading && allJobs.length === 0) return <LatestJobsSkeleton />;

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-3 text-foreground">
        🔥 Latest Job Openings
      </h2>
      <p className="text-muted-foreground mb-8">
        Fresh jobs curated specially for you
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestSixJobs.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center">
            No job openings available right now
          </p>
        ) : (
          latestSixJobs?.map((job, idx) => (
            <Card
              key={job._id}
              className="relative p-5 border shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl"
            >
              {/* Save Icon */}
              <button
                onClick={() => handleSaveToggle(job?._id)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-primary"
              >
                <Bookmark
                  size={22}
                  className="cursor-pointer"
                  fill={isSaved(job._id) ? "currentColor" : "none"}
                />
              </button>

              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-xl font-semibold leading-snug">
                  {job?.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {job?.company?.name}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 p-0">
                {/* Location */}
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="rounded-full">
                    {job?.jobType}
                  </Badge>

                  <Badge className="rounded-full flex items-center gap-1">
                    <IndianRupee size={14} /> {formatSalary(job.salary)}
                  </Badge>

                  <Badge variant="outline" className="rounded-full">
                    {formatExperience(job.experience)}
                  </Badge>
                </div>

                <Separator className="my-4" />

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {timeAgo(job.createdAt)}
                  </span>

                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="flex items-center gap-1 cursor-pointer font-medium text-primary hover:underline"
                  >
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
