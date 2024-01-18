import type { RouteObject } from "react-router-dom";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const ROUTES_PATH: { [key: string]: string } = {
  "/": "root",
  "/login": "login",
  "/dashboard/overview": "overview",
  "/dashboard/manager-overview": "overview",
  "/dashboard/managers": "managers",
  "/dashboard/profile": "profile",
  "/dashboard/manager-profile": "manager-profile",
  "/dashboard/orders": "orders",
  "/dashboard/drivers": "Driver",
  "/404": "not_found",
};

export const ADMIN_PATH = [
  "/dashboard/overview",
  "/dashboard/profile",
  "/dashboard/managers",
];

export const MANAGER_PATH = [
  "/dashboard/manager-overview",
  "/dashboard/manager-profile",
  "/dashboard/drivers",
  "/dashboard/drivers/:id",
  "/dashboard/orders",
  "/dashboard/orders/new",
  "/dashboard/orders/:id",
];

export const ADMIN_ROUTES: RouteObject[] = [
  {
    path: "/dashboard/overview",
    index: true,
    async lazy() {
      const { default: AdminDashboardPage } = await import(
        "../pages/AdminDashboardPage"
      );
      return { Component: AdminDashboardPage };
    },
  },
  {
    path: "/dashboard/managers",
    async lazy() {
      const { default: ManagersPage } = await import("../pages/ManagersPage");
      return { Component: ManagersPage };
    },
  },
  {
    path: "/dashboard/profile",
    async lazy() {
      const { default: ProfilePage } = await import("../pages/ProfilePage");
      return { Component: ProfilePage };
    },
  },
];

export const MANAGER_ROUTES: RouteObject[] = [
  {
    path: "/dashboard/manager-overview",
    index: true,
    async lazy() {
      const { default: ManagersPage } = await import(
        "../pages/ManagerDashboardPage"
      );
      return { Component: ManagersPage };
    },
  },
  {
    path: "/dashboard/manager-profile",
    async lazy() {
      const { default: ManagerProfilePage } = await import(
        "../pages/ManagerProfilePage"
      );
      return { Component: ManagerProfilePage };
    },
  },
  {
    path: "/dashboard/orders",
    async lazy() {
      const { default: OrderPage } = await import("../pages/order/OrderPage");
      return { Component: OrderPage };
    },
  },
  {
    path: "/dashboard/orders/new",
    async lazy() {
      const { default: OrderCreatePage } = await import(
        "../pages/order/OrderCreatePage"
      );
      return { Component: OrderCreatePage };
    },
  },
  {
    path: "/dashboard/orders/:id",
    async lazy() {
      const { default: OrderEditPage } = await import(
        "../pages/order/OrderEditPage"
      );
      return { Component: OrderEditPage };
    },
  },
  {
    path: "/dashboard/drivers",
    async lazy() {
      const { default: DriverPage } = await import("../pages/DriverPage");
      return { Component: DriverPage };
    },
  },
  {
    path: "/dashboard/drivers/:id",
    async lazy() {
      const { default: DriverDetailPage } = await import(
        "../pages/DriverDetailPage"
      );
      return { Component: DriverDetailPage };
    },
  },
];

export const routes: RouteObject[] = [
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
    children: ADMIN_ROUTES.concat(MANAGER_ROUTES),
  },
  {
    path: "/404",
    async lazy() {
      const { default: Page404 } = await import("../pages/Page404");
      return { Component: Page404 };
    },
  },
  { path: "*", element: <Navigate to={"/404"} replace={false} /> },
];

export const router = createBrowserRouter(routes);
