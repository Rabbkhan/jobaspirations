import React, { useState } from 'react';
import JobCard from '../../components/job/Jobcard';
import Filtercard from '../../components/job/Filtercard';
import { useSelector } from 'react-redux';
import useGetAllJobs from '../../hooks/useGetAllJobs';

const JobList = () => {
  // const [jobs, setJobs] = useState([
  //   {
  //     title: "Frontend Developer",
  //     company: "Tech Solutions Pvt Ltd",
  //     location: "Bangalore, India",
  //     type: "Full-time",
  //     salary: "₹50,000 - ₹70,000",
  //     posted: "2d ago",
  //     isSaved: false,
  //   },
  //   {
  //     title: "Backend Engineer",
  //     company: "Innovatech",
  //     location: "Hyderabad, India",
  //     type: "Part-time",
  //     salary: "₹40,000 - ₹60,000",
  //     posted: "5d ago",
  //     isSaved: true,
  //   },
  //   {
  //     title: "Full Stack Developer",
  //     company: "NextGen Labs",
  //     location: "Remote",
  //     type: "Contract",
  //     salary: "₹70,000 - ₹90,000",
  //     posted: "1d ago",
  //     isSaved: false,
  //   },
  //    {
  //     title: "Full Stack Developer",
  //     company: "NextGen Labs",
  //     location: "Remote",
  //     type: "Contract",
  //     salary: "₹70,000 - ₹90,000",
  //     posted: "1d ago",
  //     isSaved: false,
  //   },
  //    {
  //     title: "Full Stack Developer",
  //     company: "NextGen Labs",
  //     location: "Remote",
  //     type: "Contract",
  //     salary: "₹70,000 - ₹90,000",
  //     posted: "1d ago",
  //     isSaved: false,
  //   }, {
  //     title: "Full Stack Developer",
  //     company: "NextGen Labs",
  //     location: "Remote",
  //     type: "Contract",
  //     salary: "₹70,000 - ₹90,000",
  //     posted: "1d ago",
  //     isSaved: false,
  //   }, {
  //     title: "Full Stack Developer",
  //     company: "NextGen Labs",
  //     location: "Remote",
  //     type: "Contract",
  //     salary: "₹70,000 - ₹90,000",
  //     posted: "1d ago",
  //     isSaved: false,
  //   }, {
  //     title: "Full Stack Developer",
  //     company: "NextGen Labs",
  //     location: "Remote",
  //     type: "Contract",
  //     salary: "₹70,000 - ₹90,000",
  //     posted: "1d ago",
  //     isSaved: false,
  //   }, {
  //     title: "Full Stack Developer",
  //     company: "NextGen Labs",
  //     location: "Remote",
  //     type: "Contract",
  //     salary: "₹70,000 - ₹90,000",
  //     posted: "1d ago",
  //     isSaved: false,
  //   }, {
  //     title: "Full Stack Developer",
  //     company: "NextGen Labs",
  //     location: "Remote",
  //     type: "Contract",
  //     salary: "₹70,000 - ₹90,000",
  //     posted: "1d ago",
  //     isSaved: false,
  //   }, {
  //     title: "Full Stack Developer",
  //     company: "NextGen Labs",
  //     location: "Remote",
  //     type: "Contract",
  //     salary: "₹70,000 - ₹90,000",
  //     posted: "1d ago",
  //     isSaved: false,
  //   }, {
  //     title: "Full Stack Developer",
  //     company: "NextGen Labs",
  //     location: "Remote",
  //     type: "Contract",
  //     salary: "₹70,000 - ₹90,000",
  //     posted: "1d ago",
  //     isSaved: false,
  //   },
  // ]);

  // Example: you can filter jobs based on search or filter selections
  // const filteredJobs = jobs; // replace this with actual filtered array  
  
  
    useGetAllJobs();   // <-- REQUIRED

  const {allJobs} = useSelector(store=>store.job);


console.log(allJobs);

  return (
    <div className="container px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Side - Filters */}
        <div className="lg:w-1/4 w-full">
          <Filtercard />
        </div>

        {/* Right Side - Job Cards */}
        <div className="lg:w-3/4 w-full">
          {/* Show results count */}
          <p className="mb-4 text-gray-700 font-medium">
            {allJobs.length} job{allJobs.length !== 1 ? 's' : ''} found
          </p>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allJobs.length < 0? <span>No job Avaliable</span>:allJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>


{/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {allJobs.map((job) => (
    <JobCard key={job._id} job={job} />
  ))}
</div> */}



        </div>

      </div>
    </div>
  );
};

export default JobList;
