import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee, EmployeePosition } from "../model/types/types";
import { apiUrl } from "@/shared/const/apiUrl";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl.baseUrl,
  }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/get/employee",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ ТабельныйНомер }) =>
                  ({ type: "Employee", id: ТабельныйНомер } as const)
              ),
              { type: "Employee", id: "LIST" },
            ]
          : [{ type: "Employee", id: "LIST" }],
    }),
    getEmployeePosition: builder.query<EmployeePosition[], void>({
      query: () => "/get/job-title",
    }),
    addEmployee: builder.mutation<Employee, Omit<Employee, "ТабельныйНомер">>({
      query: (employee) => ({
        url: "/add/employee",
        method: "POST",
        body: JSON.stringify(employee),
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useGetEmployeePositionQuery,
} = employeesApi;
