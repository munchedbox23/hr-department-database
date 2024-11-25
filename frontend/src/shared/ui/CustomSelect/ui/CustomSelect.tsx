import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface CustomSelectProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        name={name}
        value={value}
        required
        onChange={onChange}
        label={label}
        fullWidth
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: "200px",
              overflowY: "auto",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{ width: "100%" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
