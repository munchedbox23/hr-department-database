import { Box, Button } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import { Employee } from "@/entities/employee";

export const EmployeeActionsToolbar = ({
  table,
}: {
  table: MRT_TableInstance<Employee>;
}) => {
  const handleDeactivate = () => {
    table
      .getSelectedRowModel()
      .flatRows.map((row) => alert("deactivating " + row.getValue("name")));
  };

  const handleActivate = () => {
    table
      .getSelectedRowModel()
      .flatRows.map((row) => alert("activating " + row.getValue("name")));
  };

  const handleContact = () => {
    table
      .getSelectedRowModel()
      .flatRows.map((row) => alert("contact " + row.getValue("name")));
  };

  return (
    <Box sx={{ display: "flex", gap: "0.5rem" }}>
      <Button
        color="error"
        disabled={!table.getIsSomeRowsSelected()}
        onClick={handleDeactivate}
        variant="contained"
      >
        Deactivate
      </Button>
      <Button
        color="success"
        disabled={!table.getIsSomeRowsSelected()}
        onClick={handleActivate}
        variant="contained"
      >
        Activate
      </Button>
      <Button
        color="info"
        disabled={!table.getIsSomeRowsSelected()}
        onClick={handleContact}
        variant="contained"
      >
        Contact
      </Button>
    </Box>
  );
};
