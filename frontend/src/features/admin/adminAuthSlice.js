import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    loading: false,   // 👈 VERY IMPORTANT
    admin: null,
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
  },
});


export const {
  setAdminLoading,
  setAdmin,
  clearAdmin,
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
