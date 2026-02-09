import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    loading: false,       // For admin login actions
    admin: null,          // Admin info
    applications: [],     // Pending recruiter applications
    applicationsLoading: false, // Loading state for fetching applications
  },
  reducers: {
    setAdminLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    clearAdmin: (state) => {
      state.admin = null;
      state.loading = false;
    },
    setApplicationsLoading: (state, action) => {
      state.applicationsLoading = action.payload;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    updateApplicationStatus: (state, action) => {
      const { applicationId, status } = action.payload;
      const index = state.applications.findIndex(app => app._id === applicationId);
      if (index !== -1) {
        state.applications[index].status = status;
      }
    },
  },
});

export const {
  setAdminLoading,
  setAdmin,
  clearAdmin,
  setApplicationsLoading,
  setApplications,
  updateApplicationStatus,
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
