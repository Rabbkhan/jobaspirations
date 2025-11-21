import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../features/jobSlice";

const useGetAllJobs = () => {
  const disptach = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          disptach(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
