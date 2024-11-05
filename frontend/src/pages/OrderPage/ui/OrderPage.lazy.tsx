import { lazy } from "react";

export const OrdersPageLazy = lazy(() =>
  import("./OrderPage").then((module) => ({
    default: module.OrdersPage,
  }))
);
