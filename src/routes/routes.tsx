import { Navigate, createBrowserRouter } from "react-router-dom";

import DashboardLayout from "@/layouts/guard/dashboard";
import UserDetailPage from "@/pages/UserDetailPage";

export const router = createBrowserRouter([
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
        children: [
          {
            path: "new",
            element: <UserDetailPage />,
          },
        ],
      },
    ],
  },
  //   {
  //     element: <PublicLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/manager" /> },
  //       { path: "login", element: <LoginPage /> },
  //       { path: "404", element: <Page404 /> },
  //       { path: "*", element: <Navigate to="/404" /> },
  //     ],
  //   },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);
