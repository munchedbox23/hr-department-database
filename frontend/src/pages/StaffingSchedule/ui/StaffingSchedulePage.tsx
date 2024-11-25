import React from "react";
import { Container } from "@mui/material";
import { Table } from "@/widgets/Table";
import { MRT_ColumnDef } from "material-react-table";
import { StaffingRecord } from "@/entities/staffing/model/types/types";
import { useGetStaffingQuery } from "@/entities/staffing";
import { useGetEmployeePositionQuery } from "@/entities/employee";
import { CreateStaffingForm } from "@/features/staffing/createStaffing";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";

export const StaffingSchedulePage: React.FC = () => {
  const { data: staffingData, isLoading } = useGetStaffingQuery();
  const { data: positions } = useGetEmployeePositionQuery();

  const columns: MRT_ColumnDef<StaffingRecord>[] = [
    {
      accessorKey: "НомерЗаписи",
      header: "Номер Записи",
      size: 100,
    },
    {
      accessorKey: "КодДолжности",
      header: "Должность",
      size: 100,
    },
    {
      accessorKey: "КодОтдела",
      header: "Название Отдела",
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

  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <CreateAnEntity title="Добавить штатное расписание">
        <CreateStaffingForm
          positions={positions || []}
          onStaffingAdded={handleOpenSnackbar}
        />
      </CreateAnEntity>
      <Table columns={columns} data={staffingData || []} />
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Штатное расписание успешно добавлено!"
        severity="success"
      />
    </Container>
  );
};
