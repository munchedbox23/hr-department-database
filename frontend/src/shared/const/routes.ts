export enum AppRoutes {
<<<<<<< HEAD
  AUTH = "authorization",
  NOT_FOUND = "not-found",
=======
  AUTH = "/authorization",
  NOT_FOUND = "/not-found",
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
}

export const getRouteAuth = () => `/${AppRoutes.AUTH}`;
export const getRouteNotFound = () => `/${AppRoutes.NOT_FOUND}`;

export const appRoutes = {
  auth: getRouteAuth,
  notFound: getRouteNotFound,
};
