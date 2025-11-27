import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'
import { Toaster } from "@/components/ui/sonner"
import { Provider } from "react-redux"
import { store } from "./store/store"; // make sure store exports persistor too
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from "redux-persist";
import DashboardLoading from "./components/common/loading/DashboardLoading";

const persistor = persistStore(store)


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster /> {/* moved inside */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
