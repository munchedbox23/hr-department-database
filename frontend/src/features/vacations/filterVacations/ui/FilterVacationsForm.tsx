import { TextField, Box } from "@mui/material";
import { ChangeEvent } from "react";

export const FilterVacationsForm = ({
  formState,
  handleChange,
}: {
  formState: {
    type: string;
    startDate: string;
    endDate: string;
    employeeId: string | number;
  };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Основание отпуска"
        type="text"
        name="type"
        value={formState.type}
        onChange={handleChange}
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        label="Дата начала"
        type="date"
        name="startDate"
        value={formState.startDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        label="Дата окончания"
        type="date"
        name="endDate"
        value={formState.endDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        label="Табельный номер"
        name="employeeId"
        value={formState.employeeId}
        onChange={handleChange}
        sx={{ backgroundColor: "white" }}
      />
    </Box>
  );
};
