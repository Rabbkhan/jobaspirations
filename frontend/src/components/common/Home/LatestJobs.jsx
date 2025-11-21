import React from "react";
import { Bookmark, MapPin, Briefcase, ArrowRight, IndianRupee } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

// const jobs = [
//   {
//     title: "Mobile App Developer (React Native)",
//     company: "AppRidge Solutions",
//     location: "Pune, India",
//     type: "Full Time",
//     salary: "6–12 LPA",
//     experience: "0–1 yrs",
//     posted: "2 days ago",
//   },
//   {
//     title: "Python Django Intern",
//     company: "DataNest Labs",
//     location: "Gurgaon, India",
//     type: "Internship",
//     salary: "10k–20k / month",
//     experience: "Fresher",
//     posted: "1 day ago",
//   },
//   {
//     title: "DevOps Engineer",
//     company: "CloudSphere",
//     location: "Remote",
//     type: "Full Time",
//     salary: "15–25 LPA",
//     experience: "1–3 yrs",
//     posted: "3 days ago",
//   },
//   {
//     title: "Software Testing / QA Engineer",
//     company: "TestFlow",
//     location: "Mumbai, India",
//     type: "Part Time",
//     salary: "3–5 LPA",
//     experience: "0–1 yrs",
//     posted: "5 hours ago",
//   },
//   {
//     title: "MERN Stack Developer",
//     company: "StackForge",
//     location: "Noida, India",
//     type: "Full Time",
//     salary: "8–16 LPA",
//     experience: "1–2 yrs",
//     posted: "4 days ago",
//   },
//   {
//     title: "AI / ML Intern",
//     company: "NeuroByte AI",
//     location: "Chennai, India",
//     type: "Internship",
//     salary: "12k–25k / month",
//     experience: "Fresher",
//     posted: "7 hours ago",
//   },
// ];

const LatestJobs = () => {

  const {allJobs} = useSelector(store=>store.job);
  
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



const formatExperience = (exp) => {
  if (exp === 0) return "Fresher";
  return `${exp} ${exp > 1 ? "years" : "year"}`;
};


  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-3 text-foreground">🔥 Latest Job Openings</h2>
      <p className="text-muted-foreground mb-8">Fresh jobs curated specially for you</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allJobs.length < 0? <span>No job Avaliable</span> :allJobs?.map((job, idx) => (
          <Card
            key={idx}
            className="relative p-5 border shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl"
          >
            {/* Save Icon */}
            <button className="absolute right-4 top-4 text-muted-foreground hover:text-primary">
              <Bookmark size={20} />
            </button>

            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-xl font-semibold leading-snug">{job?.title}</CardTitle>
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
                  <IndianRupee size={14} /> {job.salary}
                </Badge>

                <Badge variant="outline" className="rounded-full">
                  {formatExperience(job?.experienceLevel)}
                </Badge>
              </div>

              <Separator className="my-4" />

              {/* Footer */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{timeAgo(job.createdAt)}</span>

                <button className="flex items-center gap-1 font-medium text-primary hover:underline">
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LatestJobs;
