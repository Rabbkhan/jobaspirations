import { toast } from "sonner";
import {
  getSavedJobsApi,
  saveJobApi,
  unsaveJobApi,
} from "../api/jobSavedApi";

import { setSavedJobs } from "../features/jobSlice";

/**
 * Load saved jobs on app start / refresh
 */
export const loadSavedJobs = () => async (dispatch,getState) => {

    const { user } = getState().auth;


    // 🚫 Not logged in → do nothing
    if (!user) return;

  // 🚫 Not logged in
  if (!user) {
    toast.error("Please login to save jobs");
    return;
  }

  try {
    const { data } = await getSavedJobsApi();

    if (data?.success) {
      dispatch(setSavedJobs(data.savedJobs));
    }
  } catch (error) {
    console.error("Failed to load saved jobs:", error.message);
  }
};

/**
 * Save a job
 */
export const saveJobThunk = (jobId) => async (dispatch, getState) => {
  const { user } = getState().auth;
  if (!user) {
    toast.error("Please login to save jobs");
    return;
  }

  try {
    const { data } = await saveJobApi(jobId);

    if (data?.success) {
      dispatch(setSavedJobs(data.savedJobs));
      toast.success(data.message || "Job saved successfully");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to save job"
    );
  }
};


/**
 * Unsave a job
 */
export const unsaveJobThunk = (jobId) => async (dispatch, getState) => {
  const { user } = getState().auth;
  if (!user) {
    toast.error("Please login to manage saved jobs");
    return;
  }

  try {
    const { data } = await unsaveJobApi(jobId);

    if (data?.success) {
      dispatch(setSavedJobs(data.savedJobs));
      toast.success(data.message || "Job removed from saved jobs");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to remove saved job"
    );
  }
};

