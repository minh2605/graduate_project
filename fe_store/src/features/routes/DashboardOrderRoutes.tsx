import { ManageOrdersPage } from "features/Admin/pages/ManageOrdersPage";
import { OrderDetailPage } from "features/Order/components/OrderDetailPage";
import { Outlet, Route, Routes } from "react-router-dom";

export const DashboardOrderRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path="/" element={<ManageOrdersPage />} />
        <Route path="/detail/:orderId" element={<OrderDetailPage />} />
      </Route>
    </Routes>
  );
};
