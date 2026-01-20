import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs, appendJobs, setLoading } from "../features/jobSlice";
import { JOB_API_END_POINT } from "../utils/constants";

const useGetAllJobs = (filters) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isFetchingRef = useRef(false);
  const isFilterResettingRef = useRef(false);

 const fetchJobs = async (pageNumber, force = false) => {
  if (isFetchingRef.current) return;
  if (!hasMore && !force) return;

  isFetchingRef.current = true;
  dispatch(setLoading(true));

  const safeFilters = filters || {}; // 🔒 safety

  const cleanFilters = Object.fromEntries(
    Object.entries(safeFilters).filter(([_, v]) => v !== "")
  );

  try {
    const res = await axios.get(JOB_API_END_POINT, {
      params: {
        page: pageNumber,
        limit: 9,
        ...cleanFilters,
      },
      withCredentials: true,
    });

    if (res.data.success) {
      if (pageNumber === 1) dispatch(setAllJobs(res.data.jobs));
      else dispatch(appendJobs(res.data.jobs));

      setHasMore(res.data.hasMore);
    }
  } finally {
    isFetchingRef.current = false;
    isFilterResettingRef.current = false;
    dispatch(setLoading(false));
  }
};


  // 🔄 FILTER CHANGE → HARD RESET + FORCE FETCH
  useEffect(() => {
    isFilterResettingRef.current = true;
    setHasMore(true);
    setPage(1);
    dispatch(setAllJobs([]));
    fetchJobs(1, true); // ✅ FORCE PAGE-1 FETCH
  }, [filters]);

  // ⬇️ PAGE CHANGE → FETCH (NORMAL)
  useEffect(() => {
    if (page > 1) {
      fetchJobs(page);
    }
  }, [page]);

  return { setPage, hasMore, isFilterResettingRef };
};




export default useGetAllJobs;
