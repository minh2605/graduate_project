import { ManageCategoryPage } from "features/Admin/pages/ManageCategoryPage";
import { CategoryEditPage } from "features/Category/components/CategoryEditPage";
import { Routes, Route, Outlet } from "react-router-dom";

export const DashboardCategoryRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path="/" element={<ManageCategoryPage />} />
        <Route path="/detail/:categoryId" element={<CategoryEditPage />} />
      </Route>
    </Routes>
  );
};
