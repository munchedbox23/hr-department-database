import { lazy } from "react";

export const StaffingSchedulePageLazy = lazy(() =>
  import("./StaffingSchedulePage").then((module) => ({
    default: module.StaffingSchedulePage,
  }))
);
