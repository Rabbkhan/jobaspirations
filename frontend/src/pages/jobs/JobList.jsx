import React, { useState, useRef, useEffect, useMemo } from "react";
import JobCard from "../../components/job/Jobcard";
import HeaderFilterBar from "../../components/job/HeaderFilterBar";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { Loader2 } from "lucide-react";
import { saveJobThunk, unsaveJobThunk } from "../../thunk/SavedJobThunk";

const JobList = () => {
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    salary: "",
    experience: "", // ✅ ADD THIS
  });

  const { allJobs, savedJobs ,loading } = useSelector((store) => store.job);

  // console.log(allJobs);
  
  const savedJobIds = useMemo(() => {
    return new Set(savedJobs.map((job) => job._id));
  }, [savedJobs]);

  const isSaved = (jobId) => savedJobIds.has(jobId);

  const { setPage, hasMore, isFilterResettingRef } = useGetAllJobs(filters);

  const dispatch = useDispatch();
  // Infinite scroll trigger
  const observerRef = useRef();


useEffect(() => {
  if (!observerRef.current) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (
      entry.isIntersecting &&
      hasMore &&
      !loading &&
      !isFilterResettingRef.current 
    ) {
      setPage((prev) => prev + 1);
    }
  });

  observer.observe(observerRef.current);

  return () => observer.disconnect();
}, [hasMore, loading, setPage]);


  const handleSaveToggle = (jobId) => {
    if (isSaved(jobId)) {
      dispatch(unsaveJobThunk(jobId));
    } else {
      dispatch(saveJobThunk(jobId));
    }
  };

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
            <JobCard
              key={job._id}
              job={job}
              isSaved={isSaved(job._id)}
              onToggleSave={() => handleSaveToggle(job._id)}
            />
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
        <p className="text-center text-gray-500 mt-4">No more jobs available</p>
      )}
    </div>
  );
};

export default JobList;
