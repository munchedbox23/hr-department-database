import React from "react";
import { Container, Typography, Stack } from "@mui/material";
import { ListOfItem } from "@/widgets/ListOfItem";
import { TripsItem } from "@/entities/trips";
import { useGetTripsQuery } from "@/entities/trips";
import { ListItemSkeleton } from "@/shared/ui/ListItemSkeleton";
import { ShowTrip } from "@/features/trips/show-trip";
import { CreateTripForm } from "@/features/trips/createTrip";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";

export const TripsPage: React.FC = () => {
  const { data: trips = [], isLoading } = useGetTripsQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();


  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack
        flexDirection="row" 
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Командировки
        </Typography>
        <CreateAnEntity title="Создать новую запись">
          <CreateTripForm onTripAdded={handleOpenSnackbar} />
        </CreateAnEntity>
      </Stack>
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
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Запись успешно добавлена!"
        severity="success"
      />
    </Container>
  );
};
