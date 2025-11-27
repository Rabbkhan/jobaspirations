import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    allAdminJobs:[],
    singleJob:null,
  },

  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob:(state,action) =>{
      state.singleJob = action.payload;
    },
        setAdminJob:(state,action) =>{
      state.allAdminJobs = action.payload;
    }
  },
});
export const { setAllJobs, setSingleJob, setAdminJob } = jobSlice.actions;

export default jobSlice.reducer;
