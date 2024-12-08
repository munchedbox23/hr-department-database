import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Button,
  Box,
} from "@mui/material";
import { Vacation } from "../model/types/types";
import { IUser } from "@/entities/user";
import {
  useDeleteVacationMutation,
  useUpdateVacationMutation,
} from "../api/vacationApi";

export const VacationItem: React.FC<{
  vacation: Vacation;
  children?: React.ReactNode;
  userRole: string | null;
}> = ({ vacation, children, userRole }) => {
  const isAccepted = vacation.Статус === "принято";
  const chipLabel = isAccepted ? "Принято" : "Не принято";
  const chipColor = isAccepted ? "success" : "error";

  const [deleteVacation, { isLoading: isDeleting }] =
    useDeleteVacationMutation();
  const [updateVacation, { isLoading: isUpdating }] =
    useUpdateVacationMutation();

  const handleDeleteVacation = async () => {
    await deleteVacation({ vacation: vacation, id: vacation.НомерЗаписи });
  };

  const handleApproveVacation = async () => {
    await updateVacation({
      vacation: { ...vacation, Статус: "принято" },
      id: vacation.НомерЗаписи,
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{ marginBottom: 2, padding: 2, borderRadius: 2 }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          <span style={{ color: "#1E90FF" }}>
            Отпуск №{vacation.НомерЗаписи}
          </span>{" "}
          - {vacation.ВидОтпуска}
          <Chip label={chipLabel} color={chipColor} sx={{ marginLeft: 1 }} />
        </Typography>
        <Divider />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          Дата начала: {vacation.ДатаОтпуска}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Дата окончания: {vacation.ДатаОкончания}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Количество дней: {vacation.КоличествоДней}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Основание: {vacation.Основание}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Табельный номер: {vacation.ТабельныйНомер}
        </Typography>
        {!isAccepted && userRole === "admin" && (
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApproveVacation}
            >
              Одобрить
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteVacation}
              sx={{ marginLeft: 1 }}
            >
              Отклонить
            </Button>
            {children}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
