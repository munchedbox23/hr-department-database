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
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ НомерЗаписи }) =>
                  ({ type: "TripComposition", id: НомерЗаписи } as const)
              ),
              { type: "TripComposition", id: "LIST" },
            ]
          : [{ type: "TripComposition", id: "LIST" }],
    }),
    addTrip: builder.mutation<ITrip, Omit<ITrip, "НомерЗаписи">>({
      query: (trip) => ({
        url: "/add/business-trip",
        method: "POST",
        body: JSON.stringify(trip),
      }),
      invalidatesTags: ["Trips", { type: "Trips", id: "LIST" }],
    }),
    updateTrip: builder.mutation<
      ITrip,
      { trip: Omit<ITrip, "НомерЗаписи">; id: number }
    >({
      query: ({ trip, id }) => ({
        url: `/update/business-trip/${id}`,
        method: "PUT",
        body: JSON.stringify(trip),
      }),
      invalidatesTags: [{ type: "Trips", id: "LIST" }],
    }),
    deleteTrip: builder.mutation<void, { id: number; organization: string }>({
      query: ({ id, organization }) => ({
        url: `/delete/composition-business-trip/${id}`,
        method: "DELETE",
        body: JSON.stringify({ НомерЗаписи: organization }),
      }),
      invalidatesTags: [{ type: "TripComposition", id: "LIST" }],
    }),
      addTripComposition: builder.mutation<ITripComposition, { id: number; organization: string }>({
        query: ({id, organization}) => ({
          url: "/add/composition-business-trip",
        method: "POST",
        body: JSON.stringify({
          НомерЗаписи: organization,
          ТабельныйНомер: id,
        }),
      }),
      invalidatesTags: [{ type: "TripComposition", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTripsQuery,
  useGetTripCompositionQuery,
  useAddTripMutation,
  useUpdateTripMutation,
  useDeleteTripMutation,
  useAddTripCompositionMutation,
} = tripsApi;
