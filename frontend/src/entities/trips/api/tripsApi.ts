import { apiUrl } from "@/shared/const/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITrip, ITripComposition } from "../model/types/types";

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  endpoints: (builder) => ({
    getTrips: builder.query<ITrip[], void>({
      query: () => "/get/business-trip",
    }),
    getTripComposition: builder.query<ITripComposition[], void>({
      query: () => "/get/composition-business-trip",
    }),
  }),
});

export const { useGetTripsQuery, useGetTripCompositionQuery } = tripsApi;
