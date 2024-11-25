import { apiUrl } from "@/shared/const/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DepartmentRecord } from "../model/types";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  tagTypes: ["Department"],
  endpoints: (builder) => ({
    getDepartment: builder.query<DepartmentRecord[], void>({
      query: () => "/get/department",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ КодОтдела }) =>
                  ({ type: "Department", id: КодОтдела } as const)
              ),
              { type: "Department", id: "LIST" },
            ]
          : [{ type: "Department", id: "LIST" }],
    }),
  }),
});

export const { useGetDepartmentQuery } = departmentApi;
