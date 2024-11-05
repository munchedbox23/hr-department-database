import { lazy } from "react";

export const TripsPageLazy = lazy(() =>
  import("./TripsPage").then((module) => ({
    default: module.TripsPage,
  }))
);
