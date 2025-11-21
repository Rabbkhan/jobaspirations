import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import jobSlice from "../features/jobSlice";

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

// ---- Persist Config (only for auth) ----
const persistConfig = {
  key: "auth",
  storage,
};

// ---- Wrap ONLY Auth Reducer ----
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

// ---- Store ----
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // persisted
    job: jobSlice,              // NOT persisted
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);
