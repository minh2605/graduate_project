import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const HomePage = <div>Home Page</div>;
const MenuPage = <div>Menu Page</div>;
const OrderPage = <div>Order Page</div>;

const APP_ROUTES = [
  {
    path: "/home",
    element: HomePage,
  },
  {
    path: "/menu",
    element: MenuPage,
  },
  {
    path: "/order",
    element: OrderPage,
  },
];

export const AppRoutes = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="/home" element={<div>HOME PAGE</div>} />
          {APP_ROUTES.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
