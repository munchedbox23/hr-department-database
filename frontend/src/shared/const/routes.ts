export enum AppRoutes {
  AUTH = "authorization",
  EMPLOYEES = "employees",
  VACATIONS = "vacations",
  BUSINESS_TRIPS = "business-trips",
  LABOR_CONTRACTS = "labor-contracts",
  STAFFING = "staffing",
  ATTENDANCE = "attendance",
  NOT_FOUND = "*",
}

export const getRouteAuth = () => `/${AppRoutes.AUTH}`;
export const getEmployees = () => `${AppRoutes.EMPLOYEES}`;
export const getRouteNotFound = () => `${AppRoutes.NOT_FOUND}`;
export const getRouteHome = () => `/`;
export const getRouteVacations = () => `${AppRoutes.VACATIONS}`;
export const getRouteBusinessTrips = () => `${AppRoutes.BUSINESS_TRIPS}`;
export const getRouteLaborContracts = () => `${AppRoutes.LABOR_CONTRACTS}`;
export const getRouteStaffing = () => `${AppRoutes.STAFFING}`;
export const getRouteAttendance = () => `${AppRoutes.ATTENDANCE}`;

export const appRoutes = {
  home: getRouteHome,
  auth: getRouteAuth,
  employees: getEmployees,
  vacations: getRouteVacations,
  businessTrips: getRouteBusinessTrips,
  laborContracts: getRouteLaborContracts,
  staffing: getRouteStaffing,
  attendance: getRouteAttendance,
  notFound: getRouteNotFound,
};
