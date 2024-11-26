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
    addDepartment: builder.mutation<
      DepartmentRecord,
      Omit<DepartmentRecord, "КодОтдела">
    >({
      query: (department) => ({
        url: "/add/department",
        method: "POST",
        body: JSON.stringify(department),
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),
    updateDepartment: builder.mutation<
      DepartmentRecord,
      { department: Omit<DepartmentRecord, "КодОтдела">; id: number }
    >({
      query: ({ department, id }) => ({
        url: `/update/department/${id}`,
        method: "PUT",
        body: JSON.stringify(department),
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDepartmentQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentApi;
