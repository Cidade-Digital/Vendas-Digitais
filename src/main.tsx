import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import AdminDashboard from "./pages/AdminDashboard";
import CrmFamiliaLanding from "./pages/landing/CrmFamiliaLanding";

const router = createBrowserRouter(
  [
    { path: "/", element: <Navigate to="/admin" replace /> },
    { path: "/admin", element: <AdminDashboard /> },
    { path: "/lp/crm-familia", element: <CrmFamiliaLanding /> },
  ],
  // Mesmo valor do `base` no vite.config.ts (sem a barra final).
  { basename: import.meta.env.BASE_URL.replace(/\/$/, "") }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
