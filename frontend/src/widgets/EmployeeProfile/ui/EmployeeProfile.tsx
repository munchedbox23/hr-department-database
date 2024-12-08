import React from "react";
import { Avatar, Box, Typography, Paper, Grid } from "@mui/material";
import { Employee } from "@/entities/employee";

export const EmployeeProfile: React.FC<{ employee: Employee }> = ({
  employee,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        maxWidth: "900px",
        height: "50vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
          {employee.ФИО.charAt(0)}
        </Avatar>
        <Typography variant="h5">{employee.ФИО}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Пол:</strong> {employee.Пол}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Дата Рождения:</strong>{" "}
            {new Date(employee.ДатаРождения).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Должность:</strong> {employee.КодДолжности}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Отдел:</strong> {employee.КодОтдела}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Стаж:</strong> {employee.Стаж ?? "нет опыта"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Телефон:</strong> {employee.Телефон}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Прописка:</strong> {employee.Прописка}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Образование:</strong> {employee.Образование}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Дата Приема:</strong>{" "}
            {new Date(employee.ДатаПриема).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Почта:</strong> {employee.Почта}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Семейное Положение:</strong> {employee.СемейноеПоложение}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
