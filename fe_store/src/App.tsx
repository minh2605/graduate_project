import { AppRoutes } from "features/routes/AppRoutes";
import { PrivateRoutes } from "features/routes/PrivateRoutes";
import { PublicRoutes } from "features/routes/PublicRoutes";
import { Navigate, Route, Routes } from "react-router-dom";

const App = (): JSX.Element => {
  return (
    <div className="min-h-screen text-dark-grey">
      <Routes>
        <Route path="/public/*" element={<PublicRoutes />} />
        <Route path="/admin/*" element={<PrivateRoutes />} />
        <Route index element={<Navigate to="home" />} />
        <Route path="*" element={<AppRoutes />} />
      </Routes>
    </div>
  );
};

export default App;
