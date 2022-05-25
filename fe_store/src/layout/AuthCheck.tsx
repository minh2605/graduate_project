import { AccountRole } from "common/types/auth";
import useAuth from "hooks/useAuth";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

type AuthCheckProps = {
  isPublic?: boolean;
  children: React.ReactNode;
};

export const AuthCheck = ({
  isPublic,
  children,
}: AuthCheckProps): JSX.Element => {
  const { isLoggedIn, currentUserProfile } = useAuth();
  const location = useLocation();

  if (
    isLoggedIn &&
    currentUserProfile &&
    currentUserProfile.role_name === AccountRole.ADMIN
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/public/sign-in" state={{ from: location }} replace />;
  }
};
