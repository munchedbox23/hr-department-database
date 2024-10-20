export enum AppRoutes {
  AUTH = "authorization",
  NOT_FOUND = "*",
}

export const getRouteAuth = () => `/${AppRoutes.AUTH}`;
export const getRouteNotFound = () => `${AppRoutes.NOT_FOUND}`;
export const getRouteHome = () => `/`;

export const appRoutes = {
  home: getRouteHome,
  auth: getRouteAuth,
  notFound: getRouteNotFound,
};
