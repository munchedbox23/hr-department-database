import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Box } from "@mui/material";
import { Employee } from "../model/types/types";

export const EmployeeTable = ({ data }: { data: Employee[] }) => {
  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "name",
        header: "Name",
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box display="flex" alignItems="center" gap="1rem">
            <img
              alt="avatar"
              height={30}
              src={row.original.avatar}
              style={{ borderRadius: "50%" }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 300,
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={data} />;
};
