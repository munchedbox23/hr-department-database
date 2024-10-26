import {
  MRT_GlobalFilterTextField,
  MRT_TableInstance,
} from "material-react-table";
import { Employee } from "@/entities/employee";

export const GlobalFilter = ({
  table,
}: {
  table: MRT_TableInstance<Employee>;
}) => {
  return <MRT_GlobalFilterTextField table={table} />;
};
