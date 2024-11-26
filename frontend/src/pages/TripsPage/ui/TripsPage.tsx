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
import { UpdateTripForm } from "@/features/trips/updateTrip";
import { EditAnEntity } from "@/features/common/edit-an-entity";

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
              <Stack flexDirection="column" gap={2}>
                <ShowTrip trip={trip} />
                <EditAnEntity title="Изменить запись">
                  <UpdateTripForm
                    trip={trip}
                    onTripUpdated={handleOpenSnackbar}
                  />
                </EditAnEntity>
              </Stack>
            </TripsItem>
          )}
          getKey={(trip) => trip.НомерЗаписи}
        />
      )}
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Операция выполнена успешно!"
        severity="success"
      />
    </Container>
  );
};
