import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer />
  </>
  // </React.StrictMode>
);
