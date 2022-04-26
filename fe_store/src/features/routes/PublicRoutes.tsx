import { Routes, Route, Navigate, Outlet } from "react-router-dom";

const LoginPage = <div>Login Page</div>;
const RegisterPage = <div>Register Page</div>;
const ForgotPasswordPage = <div>Forgot Password Page</div>;

const PUBLIC_ROUTES = [
  { path: "/login", element: LoginPage },
  { path: "/register", element: RegisterPage },
  { path: "/forgot-password", element: ForgotPasswordPage },
];

export const PublicRoutes = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route element={<Outlet />}>
          <Route index element={<Navigate to="login" />} />
          {PUBLIC_ROUTES.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
