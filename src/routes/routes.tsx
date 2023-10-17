import { Navigate, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { default: PublicLayout } = await import("../layouts/public");
      return { Component: PublicLayout };
    },
    children: [
      {
        path: "login",
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
        path: "manager",
        index: true,
        async lazy() {
          const { default: UserPage } = await import("../pages/UserPage");
          return { Component: UserPage };
        },
      },
      {
        path: "manager/new",
        async lazy() {
          const { default: UserDetailPage } = await import(
            "../pages/UserDetailPage"
          );
          return { Component: UserDetailPage };
        },
      },
    ],
  },
  {
    path: "404",
    async lazy() {
      const { default: Page404 } = await import("../pages/Page404");
      return { Component: Page404 };
    },
  },
  { path: "*", element: <Navigate to="/404" /> },
]);
