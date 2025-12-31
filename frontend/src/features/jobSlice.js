import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    jobapplied: [],
    savedJobs: [],
  },

  reducers: {
    // Used when page = 1 or filters change
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    // Used for infinite scroll (page > 1)
    appendJobs: (state, action) => {
      state.allJobs = [...state.allJobs, ...action.payload];
    },

    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    setAdminJob: (state, action) => {
      state.allAdminJobs = action.payload;
    },

    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },

    removeAdminJob: (state, action) => {
      state.allAdminJobs = state.allAdminJobs.filter(
        (job) => job._id !== action.payload
      );
    },

    setJobapplied: (state, action) => {
      state.jobapplied = action.payload;
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload.data || [];

    },
    toggleSavedJob: (state, action) => {
      const jobId = action.payload;
      if (state.savedJobs.includes(jobId)) {
        state.savedJobs = state.savedJobs.filter(id => id !== jobId);
      } else {
        state.savedJobs.push(jobId);
      }
    },

  },
});

export const {
  setAllJobs,
  appendJobs, // ← DO NOT FORGET THIS EXPORT
  setSingleJob,
  setAdminJob,
  setSearchJobByText,
  removeAdminJob,
  setJobapplied,
  setSavedJobs,
  toggleSavedJob,
} = jobSlice.actions;

export default jobSlice.reducer;
