import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobSlice from "@/features/job/jobSlice";
import adminAuthSlice from "../features/adminAuthSlice";
import companySlice from "@/features/company/companySlice";
import authSlice from "@/features/auth/authSlice"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// ✅ ONLY AUTH IS PERSISTED (FAST STARTUP)
const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["user", "isAuthenticated"], // ✅ persist only what is needed
};
const adminPersistConfig = {
  key: "admin",
  version: 1,
  storage,
  whitelist: ["admin"], // ✅ CORRECT
};


// ✅ ROOT REDUCER
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  job: jobSlice,
  adminAuth: persistReducer(adminPersistConfig, adminAuthSlice),
  company: companySlice,
});

// ✅ STORE
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// ✅ PERSISTOR
export const persistor = persistStore(store);
