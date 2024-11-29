import { TextField, Box } from "@mui/material";
import { ChangeEvent } from "react";

export const FilterTripsForm = ({
  formState,
  handleChange,
}: {
  formState: {
    goal: string;
    startDate: string;
    endDate: string;
  };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Цель командировки"
        type="text"
        name="goal"
        value={formState.goal}
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
    </Box>
  );
};
