import { lazy } from "react";

export const WorkHoursPageLazy = lazy(() =>
  import("./WorkHoursPage").then((module) => ({
    default: module.WorkHoursPage,
  }))
);
