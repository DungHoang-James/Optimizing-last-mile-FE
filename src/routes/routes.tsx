import { Navigate, createBrowserRouter } from "react-router-dom";

import DashboardLayout from "@/layouts/dashboard";
import SimpleLayout from "@/layouts/simple";
import LoginPage from "@/pages/LoginPage";
import Page404 from "@/pages/Page404";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: () => <div>...Loading...</div>,
    children: [
      {
        element: <Navigate to="/dashboard/app" />,
        index: true,
      },
      {
        path: "app",
        async lazy() {
          const { default: Dashboard } = await import(
            "../pages/DashboardAppPage"
          );
          return { Component: Dashboard };
        },
      },
      {
        path: "manager",
        async lazy() {
          const { default: UserPage } = await import("../pages/UserPage");
          return { Component: UserPage };
        },
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    element: <SimpleLayout />,
    children: [
      { element: <Navigate to="/dashboard/app" />, index: true },
      { path: "404", element: <Page404 /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);
