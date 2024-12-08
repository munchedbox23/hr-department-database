import React, { useMemo } from "react";
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
import { UpdateStaffingForm } from "@/features/staffing/updateStaffing";
import { EditAnEntity } from "@/features/common/edit-an-entity";
import { useAppSelector } from "@/app/providers/StoreProvider";

export const StaffingSchedulePage: React.FC = () => {
  const { data: staffingData, isLoading } = useGetStaffingQuery();
  const { data: positions } = useGetEmployeePositionQuery();
  const {
    openSnackbar,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbarError,
    handleCloseSnackbarError,
    handleOpenSnackbarError,
  } = useSnackbar();
  const user = useAppSelector((state) => state.user?.user) || null;

  const columns = useMemo<MRT_ColumnDef<StaffingRecord>[]>(() => {
    const baseColumns: MRT_ColumnDef<StaffingRecord>[] = [
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

    if (user && user.role !== "employee") {
      baseColumns.push({
        accessorKey: "Действия",
        header: "Действия",
        size: 150,
        Cell: ({ row }) => (
          <EditAnEntity title="Изменить расписание">
            <UpdateStaffingForm
              staffing={row.original}
              positions={positions || []}
              onStaffingUpdated={handleOpenSnackbar}
              onStaffingUpdatedError={handleOpenSnackbarError}
            />
          </EditAnEntity>
        ),
      });
    }

    return baseColumns;
  }, [user, positions]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <CreateAnEntity title="Добавить штатное расписание">
        <CreateStaffingForm
          positions={positions || []}
          onStaffingAdded={handleOpenSnackbar}
          onStaffingAddedError={handleOpenSnackbarError}
        />
      </CreateAnEntity>
      <Table columns={columns} data={staffingData || []} />
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
