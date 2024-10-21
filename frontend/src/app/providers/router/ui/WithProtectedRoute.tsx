import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactElement } from "react";
import { appRoutes } from "@/shared/const/routes";
import { useGetUserAuthQuery } from "@/entities/user/api/userApi";

type IWithProtectedRouteProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

export const WithProtectedRoute: FC<IWithProtectedRouteProps> = ({
  component,
  onlyUnAuth = false,
}) => {
  const location = useLocation();

  const { data: user, isLoading } = useGetUserAuthQuery();

  if (isLoading) return null;

  if (!user?.user && !onlyUnAuth) {
    return <Navigate to={appRoutes.auth()} state={{ from: location }} />;
  }

  if (user?.user && onlyUnAuth) {
    const { from } = location.state || { from: { pathname: appRoutes.home() } };
    return <Navigate to={from?.pathname || appRoutes.home()} replace />;
  }

  return component;
};

export const OnlyAuth = WithProtectedRoute;
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => {
  return <WithProtectedRoute onlyUnAuth={true} component={component} />;
};
