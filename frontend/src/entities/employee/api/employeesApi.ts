import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee } from "../model/types/types";
import { apiUrl } from "@/shared/const/apiUrl";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl.baseUrl,
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/get/employee",
    }),
  }),
});

export const { useGetEmployeesQuery } = employeesApi;
