import { Header } from "common/components/Header";
import { OrderCart } from "common/components/OrderCart";
import { HomePage } from "pages/HomePage";
import { CheckoutPage } from "pages/CheckoutPage";
import { OrderPage } from "pages/OrderPage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const APP_ROUTES = [
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
];

export const AppRoutes = (): JSX.Element => {
  return (
    <div>
      <Header />
      <OrderCart />
      <Routes>
        <Route
          path="/"
          element={
            <div className="mt-24 w-4/5 py-8 px-16">
              <Outlet />
            </div>
          }
        >
          <Route index element={<Navigate to="home" />} />
          <Route path="/home" element={<HomePage />} />
          {APP_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
