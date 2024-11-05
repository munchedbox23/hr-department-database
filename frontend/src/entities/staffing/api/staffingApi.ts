import { apiUrl } from "@/shared/const/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StaffingRecord } from "../model/types/types";

export const staffingApi = createApi({
  reducerPath: "staffingApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  endpoints: (builder) => ({
    getStaffing: builder.query<StaffingRecord[], void>({
      query: () => "/get/staffing-table",
    }),
  }),
});

export const { useGetStaffingQuery } = staffingApi;

