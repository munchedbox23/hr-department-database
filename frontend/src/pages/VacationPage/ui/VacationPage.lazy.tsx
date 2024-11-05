import { lazy } from "react";

export const VacationPageLazy = lazy(() =>
  import("./VacationPage").then((module) => ({
    default: module.VacationPage,
  }))
);
