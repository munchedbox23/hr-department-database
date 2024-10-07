export enum AppRoutes {
  AUTH = "/auth",
  REGISTRATION = "/registration",
  NOT_FOUND = "/not-found",
}

export const getRouteAuth = () => `/${AppRoutes.AUTH}`;
export const getRouteRegistration = () => `/${AppRoutes.REGISTRATION}`;
export const getRouteNotFound = () => `/${AppRoutes.NOT_FOUND}`;

export const appRoutes = {
  auth: getRouteAuth,
  registration: getRouteRegistration,
  notFound: getRouteNotFound,
};
