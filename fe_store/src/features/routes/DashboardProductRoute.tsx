import { ManageProductsPage } from "features/Admin/pages/ManageProductsPage";
import { ProductDetailPage } from "features/Admin/pages/ProductDetailPage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

export const DashboardProductRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path="/" element={<ManageProductsPage />} />
        <Route path="/detail/:productId" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
};
