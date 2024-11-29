import { TextField, Box } from "@mui/material";
import { ChangeEvent } from "react";

export const FilterOrdersForm = ({
  formState,
  handleChange,
}: {
  formState: {
    date: string;
  };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Дата оформления"
        type="date"
        name="date"
        value={formState.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ backgroundColor: "white" }}
      />
    </Box>
  );
};
