import { AppRoutes } from "features/routes/AppRoutes";
import { PublicRoutes } from "features/routes/PublicRoutes";
import { Navigate, Route, Routes } from "react-router-dom";

const App = (): JSX.Element => {
  return (
    <div className="min-h-screen text-dark-grey">
      <Routes>
        <Route path="/public/*" element={<PublicRoutes />} />
        <Route index element={<Navigate to="home" />} />
        <Route path="*" element={<AppRoutes />} />
      </Routes>
    </div>
  );
};

export default App;
