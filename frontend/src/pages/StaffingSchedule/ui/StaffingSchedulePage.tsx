import React from "react";
import { Container, Typography } from "@mui/material";
import { Table } from "@/widgets/Table";
import { MRT_ColumnDef } from "material-react-table";
import { StaffingRecord } from "@/entities/staffing/model/types/types";
import { useGetStaffingQuery } from "@/entities/staffing";

export const StaffingSchedulePage: React.FC = () => {
  const { data: staffingData, isLoading } = useGetStaffingQuery();

  const columns: MRT_ColumnDef<StaffingRecord>[] = [
    {
      accessorKey: "НомерЗаписи",
      header: "Номер Записи",
      size: 100,
    },
    {
      accessorKey: "КодДолжности",
      header: "Код Должности",
      size: 100,
    },
    {
      accessorKey: "КодОтдела",
      header: "Код Отдела",
      size: 100,
    },
    {
      accessorKey: "КоличествоСтавок",
      header: "Количество Ставок",
      size: 150,
    },
    {
      accessorKey: "Оклад",
      header: "Оклад",
      size: 100,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Штатное расписание
      </Typography>
      <Table columns={columns} data={staffingData || []} />
    </Container>
  );
};
