import React, { useState, useRef, useEffect } from "react";
import JobCard from "../../components/job/Jobcard";
import Filtercard from "../../components/job/Filtercard";
import { useSelector } from "react-redux";
import useGetAllJobs from "../../hooks/useGetAllJobs";

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
    <div className="container px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Filters */}
        <div className="lg:w-1/4 w-full">
          <Filtercard filters={filters} setFilters={setFilters} />
        </div>

        {/* Jobs */}
        <div className="lg:w-3/4 w-full">
          <p className="mb-4 text-gray-700 font-medium">
            {allJobs.length} job{allJobs.length !== 1 ? "s" : ""} found
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {/* Infinite scroll sentinel */}
          <div ref={observerRef} className="h-10" />

          {!hasMore && (
            <p className="text-center text-gray-500 mt-4">
              No more jobs available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;
