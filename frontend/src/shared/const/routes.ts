export enum AppRoutes {
  AUTH = "authorization",
  NOT_FOUND = "not-found",
}

export const getRouteAuth = () => `/${AppRoutes.AUTH}`;
export const getRouteNotFound = () => `/${AppRoutes.NOT_FOUND}`;

export const appRoutes = {
  auth: getRouteAuth,
  notFound: getRouteNotFound,
};
