import { useGetDepartmentQuery, DepartmentRecord } from "@/entities/department";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Loader } from "@/shared/ui/Loader";
import { Container } from "@mui/material";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { Table } from "@/widgets/Table";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";
import { CreateDepartmentForm } from "@/features/department/createDepartment";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { EditAnEntity } from "@/features/common/edit-an-entity";
import { UpdateDepartmentForm } from "@/features/department/updateDepartment";
import { useAppSelector } from "@/app/providers/StoreProvider";

export const DepartmentPage = () => {
  const { data: departments = [], isLoading } = useGetDepartmentQuery();
  const {
    openSnackbar,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbarError,
    handleCloseSnackbarError,
    handleOpenSnackbarError,
  } = useSnackbar();
  const user = useAppSelector((state) => state.user?.user) || null;

  const columns = useMemo<MRT_ColumnDef<DepartmentRecord>[]>(
    () => {
      const baseColumns: MRT_ColumnDef<DepartmentRecord>[] = [
        {
          accessorKey: "КодОтдела",
          header: "Код отдела",
          size: 100,
        },
        {
          accessorKey: "ТабельныйНомерРуководителя",
          header: "Табельный номер руководителя",
          size: 250,
        },
        {
          accessorKey: "Название",
          header: "Название отдела",
          size: 250,
        },
        {
          accessorKey: "НомерКабинета",
          header: "Номер кабинета",
          size: 250,
        },
      ];

      if (user && user.role !== "employee") {
        baseColumns.push({
          accessorKey: "Действия",
          header: "Действия",
          size: 150,
          Cell: ({ row }) => (
            <EditAnEntity title="Изменить отдел">
              <UpdateDepartmentForm
                department={row.original}
                onDepartmentAdded={handleOpenSnackbar}
                onDepartmentUpdatedError={handleOpenSnackbarError}
              />
            </EditAnEntity>
          ),
        });
      }

      return baseColumns;
    },
    [user]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <CreateAnEntity title="Добавить отдел">
        <CreateDepartmentForm
          onDepartmentAdded={handleOpenSnackbar}
          onDepartmentAddedError={handleOpenSnackbarError}
        />
      </CreateAnEntity>
      <Table data={departments} columns={columns} />
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
