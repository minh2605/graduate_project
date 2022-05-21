import useLocalStorage from "hooks/useLocalStorage";
import React from "react";
import { Location, Navigate, useLocation } from "react-router-dom";

type AuthCheckProps = {
  isPublic?: boolean;
  children: React.ReactNode;
};

export const AuthCheck = ({
  isPublic,
  children,
}: AuthCheckProps): JSX.Element => {
  const [getToken] = useLocalStorage("jwt_token");
  const isLoggedIn = !!getToken();
  const location = useLocation();
  console.log("location", location);
  // const locationState = location.pathname as { from?: Location } | null;
  if (isLoggedIn) {
    return <>{children}</>;
  } else {
    return <Navigate to="/public/sign-in" state={{ from: location }} replace />;
  }
};
