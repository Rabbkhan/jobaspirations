import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    jobapplied:[]
  },

  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
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
      state.jobapplied = action.payload
    },
  },
});
export const { setAllJobs, setSingleJob, setAdminJob, setSearchJobByText,removeAdminJob,setJobapplied } =
  jobSlice.actions;

export default jobSlice.reducer;
