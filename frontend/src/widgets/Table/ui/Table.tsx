import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
} from "material-react-table";

export const Table = <T extends K, K extends MRT_RowData>({
  data = [],
  columns = [],
}: {
  data: T[];
  columns: MRT_ColumnDef<K>[];
}) => {
  return <MaterialReactTable columns={columns} data={data} />;
};
