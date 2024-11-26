import { lazy } from "react";

export const DepartmentPageLazy = lazy(() =>
  import("./DepartmentPage").then((module) => ({
    default: module.DepartmentPage,
  }))
);
