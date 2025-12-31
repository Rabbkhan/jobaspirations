import React, { useState, useRef, useEffect } from "react";
import JobCard from "../../components/job/Jobcard";
import HeaderFilterBar from "../../components/job/HeaderFilterBar";
import { useSelector } from "react-redux";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { Loader2 } from "lucide-react";

const JobList = () => {
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    salary: "",
  });

  const { allJobs } = useSelector((store) => store.job);

  const { setPage, hasMore, loading } = useGetAllJobs(filters);

  // Infinite scroll trigger
  const observerRef = useRef();

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, setPage]);

  return (
<div className="max-w-6xl mx-auto px-4 py-6">

  {/* HEADER FILTER BAR — FULL WIDTH */}
 <HeaderFilterBar filters={filters} setFilters={setFilters} />

<div className="w-full flex justify-center mt-4">
  <div className="w-full md:w-11/12 max-w-5xl mx-auto">
    <p className="text-gray-700 font-medium">
      {allJobs.length} job{allJobs.length !== 1 ? "s" : ""} found
    </p>
  </div>
</div>

<div className="w-full flex justify-center mt-2">
  <div className="w-full md:w-11/12 max-w-5xl mx-auto flex flex-col gap-4">
    {allJobs.map((job) => (
      <JobCard key={job._id} job={job} />
    ))}
  </div>
</div>




  {loading && (
    <div className="flex justify-center py-4">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  )}

  <div ref={observerRef} className="h-10" />

  {!hasMore && (
    <p className="text-center text-gray-500 mt-4">
      No more jobs available
    </p>
  )}
</div>
  )
};

export default JobList;
