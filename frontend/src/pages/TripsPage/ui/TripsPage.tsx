import React from "react";
import { Container, Typography } from "@mui/material";
import { ListOfItem } from "@/widgets/ListOfItem";
import { TripsItem } from "@/entities/trips";
import { useGetTripsQuery } from "@/entities/trips";
import { ListItemSkeleton } from "@/shared/ui/ListItemSkeleton";
import { ShowTrip } from "@/features/show-trip";
export const TripsPage: React.FC = () => {
  const { data: trips = [], isLoading } = useGetTripsQuery();

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Командировки
      </Typography>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <ListItemSkeleton key={index} />
        ))
      ) : (
        <ListOfItem
          items={trips}
          renderItem={(trip) => (
            <TripsItem trip={trip}>
              <ShowTrip trip={trip} />
            </TripsItem>
          )}
          getKey={(trip) => trip.НомерЗаписи}
        />
      )}
    </Container>
  );
};
