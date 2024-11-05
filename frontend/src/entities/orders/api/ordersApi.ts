import { apiUrl } from "@/shared/const/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order } from "../model/types/types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl.baseUrl,
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/get/order",
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
