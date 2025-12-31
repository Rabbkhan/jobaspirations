// thunks/jobThunks.js

import { getSavedJobsApi, saveJobApi, unsaveJobApi } from "../src/api/jobSavedApi";
import { setSavedJobs } from "../src/features/jobSlice";


export const loadSavedJobs = () => async (dispatch) => {
  try {
    const { data } = await getSavedJobsApi();
    if (data.success) dispatch(setSavedJobs(data.savedJobs || []));
  } catch (err) {
    console.error("Failed to load saved jobs", err);
  }
};

export const saveJob = (jobId) => async (dispatch) => {
  try {
    const { data } = await saveJobApi(jobId);
    if (data.success) {
      dispatch(setSavedJobs(data.savedJobs));
    }
  } catch (err) {
    console.error("Failed to save job", err);
  }
};

export const unsaveJob = (jobId) => async (dispatch) => {
  try {
    const { data } = await unsaveJobApi(jobId);
    if (data.success) {
      dispatch(setSavedJobs(data.savedJobs));
    }
  } catch (err) {
    console.error("Failed to unsave job", err);
  }
};
