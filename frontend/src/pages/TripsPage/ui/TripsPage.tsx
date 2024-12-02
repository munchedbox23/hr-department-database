import React, { useEffect, useState } from "react";
import { Container, Typography, Stack, Box } from "@mui/material";
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
import { FilterBlock } from "@/widgets/Filter";
import { FilterTripsForm } from "@/features/trips/filterTrips";
import { SortTrip } from "@/features/trips/sortTrips";
import { useForm } from "@/shared/lib/hooks/useForm";
import { useSearchParams } from "react-router-dom";

export const TripsPage: React.FC = () => {
  const { data: trips = [], isLoading } = useGetTripsQuery();
  const {
    openSnackbar,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbarError,
    handleCloseSnackbarError,
    handleOpenSnackbarError,
  } = useSnackbar();
  const [filteredTrips, setFilteredTrips] = useState(trips);

  const [searchParams, setSearchParams] = useSearchParams();
  const { formState, handleChange, setFormState } = useForm({
    goal: searchParams.get("goal") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  });

  const handleReset = () => {
    setFormState({ goal: "", startDate: "", endDate: "" });
    setSearchParams({});
  };

  const handleSearch = () => {
    setSearchParams({
      goal: formState.goal,
      startDate: formState.startDate,
      endDate: formState.endDate,
    });

    const newFilteredTrips = trips?.filter((trip) => {
      const tripStartDate = new Date(trip.СДата);
      const tripEndDate = new Date(trip.ПоДату);
      const filterStartDate = formState.startDate
        ? new Date(formState.startDate)
        : null;
      const filterEndDate = formState.endDate
        ? new Date(formState.endDate)
        : null;

      return (
        (formState.goal
          ? trip.Цель.toLowerCase().includes(formState.goal.toLowerCase())
          : true) &&
        (filterStartDate ? tripStartDate >= filterStartDate : true) &&
        (filterEndDate ? tripEndDate <= filterEndDate : true)
      );
    });

    setFilteredTrips(newFilteredTrips);
  };

  useEffect(() => {
    const goal = searchParams.get("goal") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    setFilteredTrips(
      trips?.filter((trip) => {
        const tripStartDate = new Date(trip.СДата);
        const tripEndDate = new Date(trip.ПоДату);
        const filterStartDate = startDate ? new Date(startDate) : null;
        const filterEndDate = endDate ? new Date(endDate) : null;

        return (
          (goal
            ? trip.Цель.toLowerCase().includes(goal.toLowerCase())
            : true) &&
          (filterStartDate ? tripStartDate >= filterStartDate : true) &&
          (filterEndDate ? tripEndDate <= filterEndDate : true)
        );
      })
    );
  }, [searchParams, trips]);

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
        <CreateAnEntity title="Создать новую запись" tableType="командировки">
          <CreateTripForm
            onTripAdded={handleOpenSnackbar}
            onTripAddedError={handleOpenSnackbarError}
          />
        </CreateAnEntity>
      </Stack>

      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <ListItemSkeleton key={index} />
        ))
      ) : (
        <Stack flexDirection="row" gap={2}>
          <Box>
            <SortTrip
              filteredTrips={filteredTrips || []}
              setFilteredTrips={setFilteredTrips}
            />
            <FilterBlock
              onReset={handleReset}
              onApply={handleSearch}
              renderFilters={() => (
                <FilterTripsForm
                  formState={formState}
                  handleChange={handleChange}
                />
              )}
            />
          </Box>
          <ListOfItem
            items={filteredTrips || []}
            renderItem={(trip) => (
              <TripsItem trip={trip}>
                <Stack flexDirection="column" gap={2}>
                  <ShowTrip trip={trip} />
                  <EditAnEntity title="Изменить запись">
                    <UpdateTripForm
                      trip={trip}
                      onTripUpdated={handleOpenSnackbar}
                      onTripUpdatedError={handleOpenSnackbarError}
                    />
                  </EditAnEntity>
                </Stack>
              </TripsItem>
            )}
            getKey={(trip) => trip.НомерЗаписи}
          />
        </Stack>
      )}
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Операция выполнена успешно!"
        severity="success"
      />
      <NotificationSnackbar
        open={openSnackbarError}
        onClose={handleCloseSnackbarError}
        message="Ошибка при выполнении операции!"
        severity="error"
      />
    </Container>
  );
};
