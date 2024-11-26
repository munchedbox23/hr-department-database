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

export const DepartmentPage = () => {
  const { data: departments = [], isLoading } = useGetDepartmentQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

  const columns = useMemo<MRT_ColumnDef<DepartmentRecord>[]>(
    () => [
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
      {
        accessorKey: "Действия",
        header: "Действия",
        size: 150,
        Cell: ({ row }) => (
          <EditAnEntity title="Изменить отдел">
            <UpdateDepartmentForm
              department={row.original}
              onDepartmentAdded={handleOpenSnackbar}
            />
          </EditAnEntity>
        ),
      },
    ],
    [departments]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <CreateAnEntity title="Добавить отдел">
        <CreateDepartmentForm onDepartmentAdded={handleOpenSnackbar} />
      </CreateAnEntity>
      <Table data={departments} columns={columns} />
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Операция выполнена успешно!"
        severity="success"
      />
    </Container>
  );
};
