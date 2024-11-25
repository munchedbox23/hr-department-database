import { useGetDepartmentQuery, DepartmentRecord } from "@/entities/department";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Loader } from "@/shared/ui/Loader";
import { Container } from "@mui/material";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { Table } from "@/widgets/Table";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";
import { CreateAnEmployeeForm } from "@/features/employee/createAnEmployee";

export const DepartmentPage = () => {
  const { data: departments = [], isLoading } = useGetDepartmentQuery();

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
    ],
    [departments]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {/* <CreateAnEntity title="Добавить сотрудника">
        <CreateAnEmployeeForm
          positions={departments}
          onEmployeeAdded={handleOpenSnackbar}
        />
      </CreateAnEntity> */}
      <Table data={departments} columns={columns} />
      {/* <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Сотрудник успешно добавлен!"
        severity="success"
      /> */}
    </Container>
  );
};
