import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import jobSlice from "../features/jobSlice";
import companySlice from "../features/companySlice";

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

// ✅ ROOT REDUCER
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  job: jobSlice,
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
