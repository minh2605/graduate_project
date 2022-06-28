import { CheckoutPage } from "pages/CheckoutPage";
import { CheckoutResponsePage } from "pages/CheckoutResponsePage";
import { Routes, Route, Outlet } from "react-router-dom";

export const CheckoutRoute = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path="/" element={<CheckoutPage />} />
        <Route path="/:orderId" element={<CheckoutResponsePage />} />
      </Route>
    </Routes>
  );
};
