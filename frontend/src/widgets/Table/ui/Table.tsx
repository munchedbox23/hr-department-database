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
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableFullScreenToggle={false}
      localization={{
        search: "Поиск",
        showHideSearch: "Показать/Скрыть поиск",
        showHideFilters: "Показать/Скрыть фильтры",
        clearSearch: "Очистить поиск",
        showHideColumns: "Показать/Скрыть колонки",
        filterByColumn: "Фильтровать по колонке",
        toggleDensity: "Переключить плотность",
        clearFilter: "Очистить фильтр",
        toggleFullScreen: "Переключить полноэкранный режим",
        noRecordsToDisplay: "Нет данных для отображения",
        showAll: "Показать все",
        hideAll: "Скрыть все",
        sortByColumnAsc: "Сортировать по колонке по возрастанию",
        sortByColumnDesc: "Сортировать по колонке по убыванию",
        clearSort: "Очистить сортировку",
        of: "из",
        showAllColumns: "Показать все колонки",
        hideColumn: "Скрыть колонку",
        rowsPerPage: "Строк на странице",
        goToFirstPage: "Перейти к первой странице",
        goToLastPage: "Перейти к последней странице",
        goToNextPage: "Перейти к следующей странице",
        goToPreviousPage: "Перейти к предыдущей странице",
      }}
    />
  );
};
