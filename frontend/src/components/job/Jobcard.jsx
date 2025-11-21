"use client";

import React from "react";
import {
  Briefcase,
  MapPin,
  Bookmark,
  IndianRupee,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const timeAgo = (timestamp) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diff = (now - created) / 1000;

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return created.toLocaleDateString();
  };

  const formatExperience = (exp) => {
    if (exp === 0) return "Fresher";
    return `${exp} ${exp > 1 ? "years" : "year"}`;
  };


    const navigate = useNavigate();



  return (
    <Card className="relative rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Save Button */}
      <button className="absolute right-4 top-4 text-muted-foreground hover:text-primary z-20">
        <Bookmark className="w-5 h-5" />
      </button>

      {/* Posted Badge */}
      <Badge
        variant="secondary"
        className="absolute left-4 top-4 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full z-20"
      >
        {timeAgo(job?.createdAt)}
      </Badge>

      <CardHeader className="pt-12 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>

          <CardTitle className="text-xl leading-tight line-clamp-2">
            {job?.title}
          </CardTitle>
        </div>

        <CardDescription className="mt-1 text-muted-foreground font-medium">
          {job?.company?.name}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{job?.location}</span>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2 mt-2">

          <Badge className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">
            {job?.jobType}
          </Badge>

          <Badge className="rounded-full px-3 py-1 text-xs flex items-center gap-1">
            <IndianRupee size={14} /> {job.salary}
          </Badge>

          <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
            {formatExperience(job?.experienceLevel)}
          </Badge>

        </div>

        {/* CTA */}
        <button  onClick={()=> navigate(`/jobs/${job._id}`)}  className="flex items-center gap-2 mt-4 font-medium text-primary hover:underline">

  View Details <ArrowRight className="w-4 h-4" />

        </button>
      </CardContent>

    </Card>
  );
};

export default JobCard;
