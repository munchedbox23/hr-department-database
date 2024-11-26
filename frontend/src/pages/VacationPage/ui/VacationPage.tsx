import { useGetVacationsQuery, VacationItem } from "@/entities/vacations";
import { Container, Typography, Stack } from "@mui/material";
import { ListItemSkeleton } from "@/shared/ui/ListItemSkeleton";
import { ListOfItem } from "@/widgets/ListOfItem";
import { CreateVacationsForm } from "@/features/vacations/createVacations";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";
import { UpdateVacationsForm } from "@/features/vacations/updateVacations";
import { EditAnEntity } from "@/features/common/edit-an-entity";

export const VacationPage = () => {
  const { data: vacations, isLoading } = useGetVacationsQuery();
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
          Отпуска
        </Typography>
        <CreateAnEntity title="Создать новую запись">
          <CreateVacationsForm onVacationAdded={handleOpenSnackbar} />
        </CreateAnEntity>
      </Stack>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <ListItemSkeleton key={index} />
        ))
      ) : (
        <ListOfItem
          items={vacations || []}
          renderItem={(vacation) => (
            <VacationItem vacation={vacation}>
              <EditAnEntity title="Изменить запись">
                <UpdateVacationsForm
                  vacation={vacation}
                  onVacationAdded={handleOpenSnackbar}
                />
              </EditAnEntity>
            </VacationItem>
          )}
          getKey={(vacation) => vacation.НомерЗаписи}
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
