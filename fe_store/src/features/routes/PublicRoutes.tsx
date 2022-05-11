import { SigninPage } from "pages/SignInPage";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

const RegisterPage = <div>Register Page</div>;
const ForgotPasswordPage = <div>Forgot Password Page</div>;

const PUBLIC_ROUTES = [
  { path: "/sign-in", element: <SigninPage /> },
  { path: "/register", element: RegisterPage },
  { path: "/forgot-password", element: ForgotPasswordPage },
];

export const PublicRoutes = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route element={<Outlet />}>
          <Route index element={<Navigate to="sign-in" />} />
          {PUBLIC_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
