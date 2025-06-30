import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

import { router } from "./App";
import { AppContextProvider } from "./context/AppContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>
);
