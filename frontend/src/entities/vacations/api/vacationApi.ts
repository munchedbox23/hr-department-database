import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Vacation } from "../model/types/types";
import { apiUrl } from "@/shared/const/apiUrl";

export const vacationApi = createApi({
  reducerPath: "vacationApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  endpoints: (builder) => ({
    getVacations: builder.query<Vacation[], void>({
      query: () => "/get/vacation",
    }),
  }),
});

export const { useGetVacationsQuery } = vacationApi;
