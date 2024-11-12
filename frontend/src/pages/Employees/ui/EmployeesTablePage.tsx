import {
  Employee,
  useGetEmployeesQuery,
  useGetEmployeePositionQuery,
} from "@/entities/employee";
import { Table } from "@/widgets/Table";
import { Loader } from "@/shared/ui/Loader";
import { Container, Typography } from "@mui/material";
import { useMaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { CreateAnEmployeeForm } from "@/features/employee/createAnEmployee";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
export const EmployeeTablePage = () => {
  const { data = [], isLoading } = useGetEmployeesQuery();
  const { data: positions = [] } = useGetEmployeePositionQuery();

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: "ТабельныйНомер",
        header: "Табельный Номер",
        size: 100,
      },
      {
        accessorKey: "ФИО",
        header: "ФИО",
        size: 250,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="body2">{renderedCellValue}</Typography>
        ),
      },
      {
        accessorKey: "Пол",
        header: "Пол",
        size: 100,
      },
      {
        accessorKey: "КодДолжности",
        header: "Должность",
        size: 150,
      },
      {
        accessorKey: "Стаж",
        header: "Стаж",
        size: 100,
      },
      {
        accessorKey: "Телефон",
        header: "Телефон",
        size: 150,
      },
      {
        accessorKey: "Прописка",
        header: "Прописка",
        size: 200,
      },
      {
        accessorKey: "Образование",
        header: "Образование",
        size: 200,
      },
      {
        accessorKey: "ДатаПриема",
        header: "Дата Приема",
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue() as string | number;
          return new Date(dateValue).toLocaleDateString();
        },
      },
      {
        accessorKey: "Почта",
        header: "Почта",
        size: 300,
      },
      {
        accessorKey: "СемейноеПоложение",
        header: "Семейное Положение",
        size: 200,
      },
    ],
    []
  );

  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

  return isLoading ? (
    <Loader />
  ) : (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <CreateAnEntity title="Добавить сотрудника">
        <CreateAnEmployeeForm
          positions={positions}
          onEmployeeAdded={handleOpenSnackbar}
        />
      </CreateAnEntity>
      <Table data={data} columns={columns} />
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Сотрудник успешно добавлен!"
        severity="success"
      />
    </Container>
  );
};
