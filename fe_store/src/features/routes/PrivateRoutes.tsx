import { Routes, Route, Navigate, Outlet } from "react-router-dom";

const Dashboard = <div>Dashboard Page</div>;
const ManageProductPage = <div>Manage Product Page</div>;
const ManageOrderPage = <div>Manage Order Page</div>;

const PRIVATE_ROUTES = [
  { path: "/dashboard", element: Dashboard },
  { path: "/product", element: ManageProductPage },
  { path: "/order", element: ManageOrderPage },
];

export const PrivateRoutes = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route element={<Outlet />}>
          <Route index element={<Navigate to="dashboard" />} />
          {PRIVATE_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
