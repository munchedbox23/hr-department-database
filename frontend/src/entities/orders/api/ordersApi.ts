import { apiUrl } from "@/shared/const/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order } from "../model/types/types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl.baseUrl,
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/get/order",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ НомерПриказа }) =>
                  ({ type: "Orders", id: НомерПриказа } as const)
              ),
              { type: "Orders", id: "LIST" },
            ]
          : [{ type: "Orders", id: "LIST" }],
    }),
    addOrder: builder.mutation<Order, Omit<Order, "НомерПриказа">>({
      query: (order) => ({
        url: "/add/order",
        method: "POST",
        body: JSON.stringify(order),
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
  }),
});

export const { useGetOrdersQuery, useAddOrderMutation } = ordersApi;
