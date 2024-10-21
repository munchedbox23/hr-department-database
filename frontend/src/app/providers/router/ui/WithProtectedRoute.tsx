import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactElement } from "react";
import { appRoutes } from "@/shared/const/routes";
import CircularProgress from "@mui/material/CircularProgress";
import { RootState, useAppSelector } from "../../StoreProvider";
import { shallowEqual } from "react-redux";

type IWithProtectedRouteProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

export const WithProtectedRoute: FC<IWithProtectedRouteProps> = ({
  component,
  onlyUnAuth = false,
}) => {
  const location = useLocation();

  const { user, isRequestLoading, isAuthChecked } = useAppSelector(
    (store: RootState) => ({
      user: store.user.user,
      isRequestLoading: store.user.isRequestLoading,
      isAuthChecked: store.user.isAuthChecked,
    }),
    shallowEqual
  );

  if (!isAuthChecked) return null;

  if (isRequestLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to={appRoutes.auth()} state={{ from: location }} />;
  }

  if (user && onlyUnAuth) {
    const { from } = location.state || { from: { pathname: appRoutes.home() } };
    return <Navigate to={from?.pathname || appRoutes.home()} replace />;
  }

  return component;
};

export const OnlyAuth = WithProtectedRoute;
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => {
  return <WithProtectedRoute onlyUnAuth={true} component={component} />;
};
