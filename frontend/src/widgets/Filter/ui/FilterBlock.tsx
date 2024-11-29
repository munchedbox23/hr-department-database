import React from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";

export const FilterBlock = ({
  renderFilters,
  onReset,
  onApply,
}: {
  renderFilters?: () => React.ReactNode;
  onReset: () => void;
  onApply: () => void;
}) => (
  <Paper
    sx={{
      padding: "16px",
      borderRadius: "4px",
      background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
      boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
      mt: 1,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      maxHeight: "450px",
      height: "fit-content",
    }}
  >
    <Typography variant="h6" fontWeight={700} gutterBottom>
      Фильтры
    </Typography>
    {renderFilters && renderFilters()}
    <Stack flexDirection="row" justifyContent="flex-end" gap={2}>
      <Button variant="outlined" onClick={onReset}>
        Сбросить
      </Button>
      <Button variant="contained" color="primary" onClick={onApply}>
        Применить
      </Button>
    </Stack>
  </Paper>
);
