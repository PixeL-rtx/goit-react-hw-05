import React from "react";

import { createRoot } from "react-dom/client";

import "./index.css";

import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
