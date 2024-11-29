import React, { useState } from "react";
import { List, Pagination, Box, Stack, Typography } from "@mui/material";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => React.Key;
}

export const ListOfItem = <T,>({ items, renderItem, getKey }: ListProps<T>) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Stack flex={1} flexDirection="column">
      {items.length > 0 ? (
        <>
          <List>
            {currentItems.map((item) => (
              <React.Fragment key={getKey(item)}>
                {renderItem(item)}
              </React.Fragment>
            ))}
          </List>
          <Box display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      ) : (
        <Typography variant="h6" textAlign="center">
          Нет данных для отображения
        </Typography>
      )}
    </Stack>
  );
};
