import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { Vacation } from "../model/types/types";

export const VacationItem: React.FC<{ vacation: Vacation }> = ({
  vacation,
}) => {
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
      </CardContent>
    </Card>
  );
};
