import { useState } from "react";

export const useSnackbar = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  return {
    openSnackbar,
    handleCloseSnackbar,
    handleOpenSnackbar,
  };
};
