import React, { useMemo } from "react";
import { Container } from "@mui/material";
import { Table } from "@/widgets/Table";
import { MRT_Cell, MRT_ColumnDef } from "material-react-table";
import { useGetTimeSheetQuery } from "@/entities/time-sheet";
import { TimeSheetRecord } from "@/entities/time-sheet";
import { CreateTimeSheetForm } from "@/features/time-sheet/createTimeSheet";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";
import { UpdateTimeSheetForm } from "@/features/time-sheet/updateTimeSheet";
import { EditAnEntity } from "@/features/common/edit-an-entity";
import { useAppSelector } from "@/app/providers/StoreProvider";

export const WorkHoursPage: React.FC = () => {
  const { data: timeSheetData, isLoading } = useGetTimeSheetQuery();
  const user = useAppSelector((state) => state.user?.user) || null;
  const {
    openSnackbar,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbarError,
    handleCloseSnackbarError,
    handleOpenSnackbarError,
  } = useSnackbar();

  const columns = useMemo<MRT_ColumnDef<TimeSheetRecord>[]>(() => {
    const baseColumns: MRT_ColumnDef<TimeSheetRecord>[] = [
      {
        accessorKey: "ОтработанноеВремя",
        header: "Отработанное время",
        size: 100,
        Cell: ({ cell }) => `${cell.getValue<number>()} часов`,
      },
      {
        accessorKey: "Месяц",
        header: "Месяц",
        size: 100,
      },
      {
        accessorKey: "Год",
        header: "Год",
        size: 100,
      },
      {
        accessorKey: "Действия",
        header: "Действия",
        size: 150,
        Cell: ({ row }) => (
          <EditAnEntity title="Изменить запись">
            <UpdateTimeSheetForm
              timeSheet={row.original}
              onTimeSheetUpdated={handleOpenSnackbar}
              onTimeSheetUpdatedError={handleOpenSnackbarError}
            />
          </EditAnEntity>
        ),
      },
    ];

    if (user && user.role === "admin") {
      baseColumns.unshift(
        {
          accessorKey: "НомерЗаписи",
          header: "Номер записи",
          size: 100,
        },
        {
          accessorKey: "ТабельныйНомер",
          header: "Табельный номер",
          size: 100,
        }
      );
    }

    return baseColumns;
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <CreateAnEntity title="Добавить запись">
        <CreateTimeSheetForm
          onTimeSheetAdded={handleOpenSnackbar}
          onTimeSheetAddedError={handleOpenSnackbarError}
        />
      </CreateAnEntity>
      <Table columns={columns} data={timeSheetData || []} />
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
