import { ManageProductsPage } from "features/Admin/pages/ManageProductsPage";
import { ProductEditPage } from "features/Products/components/ProductEditPage";
import { Outlet, Route, Routes } from "react-router-dom";

export const DashboardProductRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path="/" element={<ManageProductsPage />} />
        <Route path="/detail/:productId" element={<ProductEditPage />} />
      </Route>
    </Routes>
  );
};
