import { AppRoutes } from "features/routes/AppRoutes";
import { PrivateRoutes } from "features/routes/PrivateRoutes";
import { PublicRoutes } from "features/routes/PublicRoutes";
import { AuthCheck } from "layout/AuthCheck";
import { HistoryPage } from "pages/HistoryPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = (): JSX.Element => {
  return (
    <div className="min-h-screen text-dark-grey">
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/public/*" element={<PublicRoutes />} />
        <Route
          path="/admin/*"
          element={
            <AuthCheck>
              <PrivateRoutes />
            </AuthCheck>
          }
        />
        <Route index element={<Navigate to="/store/home" />} />
        <Route path="/store/*" element={<AppRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
