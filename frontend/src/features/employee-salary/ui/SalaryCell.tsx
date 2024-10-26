import { Box } from "@mui/material";

export const SalaryCell = ({ salary }: { salary: number }) => {
  return (
    <Box
      component="span"
      sx={(theme) => ({
        backgroundColor:
          salary < 50000
            ? theme.palette.error.dark
            : salary >= 50000 && salary < 75000
            ? theme.palette.warning.dark
            : theme.palette.success.dark,
        borderRadius: "0.25rem",
        color: "#fff",
        maxWidth: "9ch",
        p: "0.25rem",
      })}
    >
      {salary.toLocaleString("en-US", { style: "currency", currency: "USD" })}
    </Box>
  );
};
