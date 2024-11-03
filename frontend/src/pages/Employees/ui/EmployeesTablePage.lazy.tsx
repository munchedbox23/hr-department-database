import { lazy } from "react";

export const EmployeesTablePageLazy = lazy(() =>
  import("./EmployeesTablePage").then((module) => ({
    default: module.EmployeeTablePage,
  }))
);
