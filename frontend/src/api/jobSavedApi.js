import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constants";

const API = axios.create({
  baseURL: JOB_API_END_POINT,
  withCredentials: true,
});

export const getSavedJobsApi = () => API.get("/saved");
export const saveJobApi = (jobId) => API.post(`/save/${jobId}`);
export const unsaveJobApi = (jobId) => API.delete(`/unsave/${jobId}`);
