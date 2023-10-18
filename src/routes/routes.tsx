import { Navigate, createBrowserRouter } from "react-router-dom";

export const ROUTES_PATH: { [key: string]: string } = {
  "/": "root",
  "/login": "login",
  "/dashboard": "dashboard",
  "/dashboard/managers": "managers",
  "/dashboard/profile": "profile",
  "/404": "not_found",
};

export const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { default: PublicLayout } = await import("../layouts/public");
      return { Component: PublicLayout };
    },
    children: [
      {
        path: "/login",
        async lazy() {
          const { default: LoginPage } = await import("../pages/LoginPage");
          return { Component: LoginPage };
        },
      },
    ],
  },
  {
    path: "/dashboard",
    async lazy() {
      const { default: DashboardLayout } = await import(
        "../layouts/guard/dashboard"
      );
      return { Component: DashboardLayout };
    },
    children: [
      {
        path: "/dashboard/managers",
        index: true,
        async lazy() {
          const { default: ManagersPage } = await import(
            "../pages/ManagersPage"
          );
          return { Component: ManagersPage };
        },
      },
      {
        path: "manager/new",
        async lazy() {
          const { default: ManagerPage } = await import("../pages/ManagerPage");
          return { Component: ManagerPage };
        },
      },
    ],
  },
  {
    path: "/404",
    async lazy() {
      const { default: Page404 } = await import("../pages/Page404");
      return { Component: Page404 };
    },
  },
  { path: "*", element: <Navigate to={"/404"} /> },
]);
