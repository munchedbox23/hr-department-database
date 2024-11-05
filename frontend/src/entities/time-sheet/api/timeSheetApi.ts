import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/shared/const/apiUrl";
import { TimeSheetRecord } from "../model/types/types";

export const timeSheetApi = createApi({
  reducerPath: "timeSheetApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  endpoints: (builder) => ({
    getTimeSheet: builder.query<TimeSheetRecord[], void>({
      query: () => "/get/time-sheet",
    }),
  }),
});

export const { useGetTimeSheetQuery } = timeSheetApi;
