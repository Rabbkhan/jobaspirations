import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs, appendJobs, setLoading } from "../features/jobSlice";
import { JOB_API_END_POINT } from "../utils/constants";

const useGetAllJobs = (filters) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async (pageNumber) => {
    if (!hasMore) return;

   dispatch(setLoading(true));

    try {
      const res = await axios.get(JOB_API_END_POINT, {
        params: {
          page: pageNumber,
          limit: 9,
          ...filters,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        if (pageNumber === 1) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          dispatch(appendJobs(res.data.jobs));
        }

        setHasMore(res.data.hasMore);
      }
    } catch (err) {
      console.error(err);
    } finally {
   dispatch(setLoading(false));
    }
  };

  // filter change → reset
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchJobs(1);
  }, [filters]);

  // page change → fetch next
  useEffect(() => {
    if (page > 1) {
      fetchJobs(page);
    }
  }, [page]);

  return { setPage, hasMore };
};


export default useGetAllJobs;
