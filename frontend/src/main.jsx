import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'
import { Toaster } from "@/components/ui/sonner"
import { Provider } from "react-redux"
import { store, persistor } from "./store/store"; // make sure store exports persistor too
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div className="text-center mt-10">Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster /> {/* moved inside */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
