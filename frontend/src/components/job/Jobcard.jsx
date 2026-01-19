import React from "react";
import { Briefcase, MapPin, IndianRupee, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";

const JobCard = ({ job, isSaved, onToggleSave }) => {
  const navigate = useNavigate();

  const timeAgo = (timestamp) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diff = (now - created) / 1000;

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return created.toLocaleDateString();
  };

const formatSalary = (salary) => {
  if (!salary) return "Not disclosed";
  const { min, max } = salary;
  if (min && max) return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  if (min) return `₹${min.toLocaleString()}+`;
  return "Not disclosed";
};

const formatExperience = (experience) => {
  if (!experience) return "Fresher";
  const toYearsMonths = (months) => {
    const y = Math.floor(months / 12);
    const m = months % 12;
    return `${y ? `${y}y ` : ""}${m ? `${m}m` : ""}`.trim();
  };

  return `${toYearsMonths(experience.min)} - ${toYearsMonths(experience.max)}`;
};

  return (
    <div className="relative w-full border rounded-xl bg-white shadow-sm hover:shadow-md transition-all p-5 flex flex-col md:flex-row justify-between gap-4">
      {/* LEFT SIDE */}
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Briefcase className="text-primary" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{job?.title}</h2>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              {timeAgo(job?.createdAt)}
            </span>
          </div>

          <p className="text-sm text-gray-600 font-medium">
            {job?.company?.name}
          </p>

       <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
  <span className="flex items-center gap-1">
    <MapPin className="w-4 h-4" /> {job?.location}
  </span>

  <span className="flex items-center gap-1">
    <IndianRupee size={14} />
    {formatSalary(job?.salary)}
  </span>

  <Badge variant="outline">{job?.jobType}</Badge>

  {job?.experience && (
    <Badge variant="secondary">
      {formatExperience(job.experience)}
    </Badge>
  )}
</div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 justify-end">
        <button
          onClick={onToggleSave}
          className="p-2 border rounded-lg text-gray-500 hover:text-primary cursor-pointer hover:border-primary transition"
          aria-label="Save job"
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>

        <button
          onClick={() => navigate(`/jobs/${job._id}`)}
          className="px-3 py-2 bg-primary text-white rounded-lg flex items-center cursor-pointer gap-2 hover:bg-primary/90"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
