import React from "react";
import { Container, Typography } from "@mui/material";
import { Table } from "@/widgets/Table";
import { MRT_ColumnDef } from "material-react-table";
import { useGetTimeSheetQuery } from "@/entities/time-sheet";
import { TimeSheetRecord } from "@/entities/time-sheet";

const columns: MRT_ColumnDef<TimeSheetRecord>[] = [
  {
    accessorKey: "НомерЗаписи",
    header: "Номер Записи",
    size: 100,
  },
  {
    accessorKey: "ТабельныйНомер",
    header: "ТабельныйНомер",
    size: 100,
  },
  {
    accessorKey: "ОтработанноеВремя",
    header: "ОтработанноеВремя",
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

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Учет рабочего времени
      </Typography>
      <Table columns={columns} data={timeSheetData || []} />
    </Container>
  );
};
