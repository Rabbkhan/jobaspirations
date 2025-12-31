import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constants";

export const saveJobApi = async (jobId) => {
  return axios.post(
    `${JOB_API_END_POINT}/save/${jobId}`,
    {},
    { withCredentials: true }
  );
};

export const unsaveJobApi = async (jobId) => {
  return axios.delete(
    `${JOB_API_END_POINT}/unsave/${jobId}`,
    { withCredentials: true }
  );
};

export const getSavedJobsApi = async () => {
  return axios.get(
    `${JOB_API_END_POINT}/saved`,
    { withCredentials: true }
  );
};
