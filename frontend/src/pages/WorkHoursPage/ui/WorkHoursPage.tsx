import React from "react";
import { Container } from "@mui/material";
import { Table } from "@/widgets/Table";
import { MRT_ColumnDef } from "material-react-table";
import { useGetTimeSheetQuery } from "@/entities/time-sheet";
import { TimeSheetRecord } from "@/entities/time-sheet";
import { CreateTimeSheetForm } from "@/features/time-sheet/createTimeSheet";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";

const columns: MRT_ColumnDef<TimeSheetRecord>[] = [
  {
    accessorKey: "НомерЗаписи",
    header: "Номер записи",
    size: 100,
  },
  {
    accessorKey: "ТабельныйНомер",
    header: "Табельный номер",
    size: 100,
  },
  {
    accessorKey: "ОтработанноеВремя",
    header: "Отработанное время",
    size: 100,
  },
  {
    accessorKey: "Месяц",
    header: "Месяц",
    size: 100,
  },
];

export const WorkHoursPage: React.FC = () => {
  const { data: timeSheetData, isLoading } = useGetTimeSheetQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <CreateAnEntity title="Добавить запись">
        <CreateTimeSheetForm onTimeSheetAdded={handleOpenSnackbar} />
      </CreateAnEntity>
      <Table columns={columns} data={timeSheetData || []} />
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Запись успешно добавлена!"
        severity="success"
      />
    </Container>
  );
};
