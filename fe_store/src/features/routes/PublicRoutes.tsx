import { PublicRouteLayout } from "layout/PublicRouteLayout";
import { ForgotPasswordPage } from "pages/ForgotPasswordPage";
import { RegisterPage } from "pages/RegisterPage";
import { SigninPage } from "pages/SignInPage";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

const PUBLIC_ROUTES = [
  { path: "/sign-in", element: <SigninPage /> },
  { path: "/sign-up", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
];

export const PublicRoutes = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route
          element={
            <PublicRouteLayout>
              <Outlet />
            </PublicRouteLayout>
          }
        >
          <Route index element={<Navigate to="sign-in" />} />
          {PUBLIC_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
