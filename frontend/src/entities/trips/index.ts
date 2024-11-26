export { tripsApi } from "./api/tripsApi";
export {
  useGetTripsQuery,
  useGetTripCompositionQuery,
  useAddTripMutation,
  useUpdateTripMutation,
} from "./api/tripsApi";
export type { ITrip, ITripComposition } from "./model/types/types";
export { TripsItem } from "./ui/TripsItem/TripsItem";
