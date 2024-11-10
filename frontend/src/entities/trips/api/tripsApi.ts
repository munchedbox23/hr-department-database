import { apiUrl } from "@/shared/const/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITrip, ITripComposition } from "../model/types/types";

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  tagTypes: ["Trips", "TripComposition"],
  endpoints: (builder) => ({
    getTrips: builder.query<ITrip[], void>({
      query: () => "/get/business-trip",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ НомерЗаписи }) =>
                  ({ type: "Trips", id: НомерЗаписи } as const)
              ),
              { type: "Trips", id: "LIST" },
            ]
          : [{ type: "Trips", id: "LIST" }],
    }),
    getTripComposition: builder.query<ITripComposition[], void>({
      query: () => "/get/composition-business-trip",
      providesTags: ["TripComposition"],
    }),
    addTrip: builder.mutation<ITrip, Omit<ITrip, "НомерЗаписи">>({
      query: (trip) => ({
        url: "/add/business-trip",
        method: "POST",
        body: JSON.stringify(trip),
      }),
      invalidatesTags: ["Trips", { type: "Trips", id: "LIST" }],
    }),
  }),
});

export const { useGetTripsQuery, useGetTripCompositionQuery, useAddTripMutation } = tripsApi;
