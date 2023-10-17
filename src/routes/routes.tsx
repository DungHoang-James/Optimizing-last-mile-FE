import { Navigate, createBrowserRouter } from "react-router-dom";

import DashboardLayout from "@/layouts/guard/dashboard";
import PublicLayout from "@/layouts/public/PublicLayout";
import LoginPage from "@/pages/LoginPage";
import Page404 from "@/pages/Page404";
import UserDetailPage from "@/pages/UserDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "manager",
            async lazy() {
              const { default: UserPage } = await import("../pages/UserPage");
              return { Component: UserPage };
            },
          },
          {
            path: "manager/new",
            element: <UserDetailPage />,
          },
        ],
      },
    ],
  },
  { path: "login", element: <LoginPage />, index: true },
  { path: "404", element: <Page404 /> },
  { path: "*", element: <Navigate to="/404" /> },
]);
