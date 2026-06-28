import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../constants/routes";

interface Props {
  children: ReactNode;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTES.login} replace />
  );
};
