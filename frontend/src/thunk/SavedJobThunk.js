import {
  getSavedJobsApi,
  saveJobApi,
  unsaveJobApi,
} from "../api/jobSavedApi";

import { setSavedJobs } from "../features/jobSlice";

/**
 * Load saved jobs on app start / refresh
 */
export const loadSavedJobs = () => async (dispatch) => {
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
export const saveJobThunk = (jobId) => async (dispatch) => {
  try {
    const { data } = await saveJobApi(jobId);

    if (data?.success) {
      dispatch(setSavedJobs(data.savedJobs));
    }
  } catch (error) {
    console.error("Failed to save job:", error.message);
  }
};

/**
 * Unsave a job
 */
export const unsaveJobThunk = (jobId) => async (dispatch) => {
  try {
    const { data } = await unsaveJobApi(jobId);

    if (data?.success) {
      dispatch(setSavedJobs(data.savedJobs));
    }
  } catch (error) {
    console.error("Failed to unsave job:", error.message);
  }
};
