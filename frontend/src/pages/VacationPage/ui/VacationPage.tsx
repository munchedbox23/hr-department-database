import { useGetVacationsQuery, VacationItem } from "@/entities/vacations";
import { Container, Typography, Stack, Box } from "@mui/material";
import { ListItemSkeleton } from "@/shared/ui/ListItemSkeleton";
import { ListOfItem } from "@/widgets/ListOfItem";
import { CreateVacationsForm } from "@/features/vacations/createVacations";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";
import { UpdateVacationsForm } from "@/features/vacations/updateVacations";
import { EditAnEntity } from "@/features/common/edit-an-entity";
import { FilterBlock } from "@/widgets/Filter";
import { FilterVacationsForm } from "@/features/vacations/filterVacations";
import { useForm } from "@/shared/lib/hooks/useForm";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { SortVacation } from "@/features/vacations/sortVacation";

export const VacationPage = () => {
  const { data: vacations, isLoading } = useGetVacationsQuery();
  const {
    openSnackbar,
    handleCloseSnackbar,
    handleOpenSnackbar,
    handleOpenSnackbarError,
    openSnackbarError,
    handleCloseSnackbarError,
  } = useSnackbar();

  const [searchParams, setSearchParams] = useSearchParams();
  const { formState, handleChange, setFormState } = useForm({
    type: searchParams.get("type") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
    employeeId: searchParams.get("employeeId") || "",
  });

  const [filteredVacations, setFilteredVacations] = useState(vacations);

  const handleResetParams = useCallback(() => {
    setSearchParams({});
    setFormState({
      type: "",
      startDate: "",
      endDate: "",
      employeeId: "",
    });
  }, [setSearchParams, setFormState]);

  const handleSearch = () => {
    setSearchParams({
      type: formState.type,
      startDate: formState.startDate,
      endDate: formState.endDate,
      employeeId: formState.employeeId,
    });

    const newFilteredVacations = vacations?.filter((vacation) => {
      const vacationStartDate = new Date(vacation.ДатаОтпуска);
      const vacationEndDate = new Date(vacation.ДатаОкончания);
      const filterStartDate = formState.startDate
        ? new Date(formState.startDate)
        : null;
      const filterEndDate = formState.endDate
        ? new Date(formState.endDate)
        : null;

      return (
        (formState.type
          ? vacation.Основание
              .toLowerCase()
              .includes(formState.type.toLowerCase())
          : true) &&
        (filterStartDate ? vacationStartDate >= filterStartDate : true) &&
        (filterEndDate ? vacationEndDate <= filterEndDate : true) &&
        (formState.employeeId
          ? vacation.ТабельныйНомер?.toString() === formState.employeeId
          : true)
      );
    });

    setFilteredVacations(newFilteredVacations);
  };

  useEffect(() => {
    const type = searchParams.get("type") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const employeeId = searchParams.get("employeeId") || "";

    setFilteredVacations(
      vacations?.filter((vacation) => {
        const vacationStartDate = new Date(vacation.ДатаОтпуска);
        const vacationEndDate = new Date(vacation.ДатаОкончания);
        const filterStartDate = startDate ? new Date(startDate) : null;
        const filterEndDate = endDate ? new Date(endDate) : null;

        return (
          (type
            ? vacation.Основание.toLowerCase().includes(type.toLowerCase())
            : true) &&
          (filterStartDate ? vacationStartDate >= filterStartDate : true) &&
          (filterEndDate ? vacationEndDate <= filterEndDate : true) &&
          (employeeId
            ? vacation.ТабельныйНомер?.toString() === employeeId
            : true)
        );
      })
    );
  }, [searchParams, vacations]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Отпуска
        </Typography>
        <CreateAnEntity title="Создать новую запись" tableType="отпуска">
          <CreateVacationsForm
            onVacationAdded={handleOpenSnackbar}
            onVacationAddedError={handleOpenSnackbarError}
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
            <SortVacation
              filteredVacations={filteredVacations || []}
              setFilteredVacations={setFilteredVacations}
            />
            <FilterBlock
              onReset={handleResetParams}
              onApply={handleSearch}
              renderFilters={() => (
                <FilterVacationsForm
                  formState={formState}
                  handleChange={handleChange}
                />
              )}
            />
          </Box>
          <ListOfItem
            items={filteredVacations || []}
            renderItem={(vacation) => (
              <VacationItem vacation={vacation}>
                <EditAnEntity title="Изменить запись">
                  <UpdateVacationsForm
                    vacation={vacation}
                    onVacationAdded={handleOpenSnackbar}
                    onVacationAddedError={handleOpenSnackbarError}
                  />
                </EditAnEntity>
              </VacationItem>
            )}
            getKey={(vacation) => vacation.НомерЗаписи}
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
