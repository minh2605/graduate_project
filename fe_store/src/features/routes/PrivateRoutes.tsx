import { DashboardLayout } from "layout/DashboardLayout";
import { DashboardPage } from "pages/DashboardPage";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { DashboardCategoryRoutes } from "./DashboardCategoryRoutes";
import { DashboardOrderRoutes } from "./DashboardOrderRoutes";
import { DashboardProductRoutes } from "./DashboardProductRoute";

const PRIVATE_ROUTES = [
  { path: "dashboard/*", element: <DashboardPage /> },
  { path: "product/*", element: <DashboardProductRoutes /> },
  { path: "category/*", element: <DashboardCategoryRoutes /> },
  { path: "order/*", element: <DashboardOrderRoutes /> },
];

export const PrivateRoutes = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route
          element={
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          {PRIVATE_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
