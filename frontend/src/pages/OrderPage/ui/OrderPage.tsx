import React, { useState, useEffect } from "react";
import { Container, Typography, Stack, Box } from "@mui/material";
import { ListOfItem } from "@/widgets/ListOfItem";
import { OrderListItem, useGetOrdersQuery } from "@/entities/orders";
import { ListItemSkeleton } from "@/shared/ui/ListItemSkeleton";
import { CreateOrderForm } from "@/features/orders/createOrder";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";
import { EditAnEntity } from "@/features/common/edit-an-entity";
import { UpdateOrderForm } from "@/features/orders/updateOrder";
import { FilterBlock } from "@/widgets/Filter";
import { FilterOrdersForm } from "@/features/orders/filterOrder";
import { SortOrder } from "@/features/orders/sortOrder";
import { useForm } from "@/shared/lib/hooks/useForm";
import { useSearchParams } from "react-router-dom";

export const OrdersPage: React.FC = () => {
  const { data: orders = [], isLoading } = useGetOrdersQuery();
  const {
    openSnackbar,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbarError,
    handleCloseSnackbarError,
    handleOpenSnackbarError,
  } = useSnackbar();
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchParams, setSearchParams] = useSearchParams();

  const { formState, handleChange, setFormState } = useForm({
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
    employeeId: searchParams.get("employeeId") || "",
  });

  const handleReset = () => {
    setFormState({ startDate: "", endDate: "", employeeId: "" });
    setSearchParams({});
  };

  const handleSearch = () => {
    setSearchParams({
      startDate: formState.startDate,
      endDate: formState.endDate,
      employeeId: formState.employeeId,
    });
    const newFilteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.ДатаОформления);
      const startDate = formState.startDate
        ? new Date(formState.startDate)
        : null;
      const endDate = formState.endDate ? new Date(formState.endDate) : null;
      const matchesEmployeeId = formState.employeeId
        ? order.ТабельныйНомер.toString() === formState.employeeId.toString()
        : true;
      return (
        (!startDate || orderDate >= startDate) &&
        (!endDate || orderDate <= endDate) &&
        matchesEmployeeId
      );
    });
    setFilteredOrders(newFilteredOrders);
  };

  useEffect(() => {
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const employeeId = searchParams.get("employeeId") || "";
    setFilteredOrders(
      orders.filter((order) => {
        const orderDate = new Date(order.ДатаОформления);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        const matchesEmployeeId = employeeId
          ? order.ТабельныйНомер.toString() === employeeId.toString()
          : true;
        return (
          (!start || orderDate >= start) &&
          (!end || orderDate <= end) &&
          matchesEmployeeId
        );
      })
    );
  }, [searchParams, orders]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Приказы
        </Typography>
        <CreateAnEntity title="Добавить приказ">
          <CreateOrderForm
            onOrderAdded={handleOpenSnackbar}
            onOrderAddedError={handleOpenSnackbarError}
          />
        </CreateAnEntity>
      </Stack>

      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <ListItemSkeleton key={index} />
        ))
      ) : (
        <Stack flexDirection="row" gap={2}>
          <Box>
            <SortOrder
              filteredOrders={filteredOrders || []}
              setFilteredOrders={setFilteredOrders}
            />
            <FilterBlock
              onReset={handleReset}
              onApply={handleSearch}
              renderFilters={() => (
                <FilterOrdersForm
                  formState={formState}
                  handleChange={handleChange}
                />
              )}
            />
          </Box>
          <ListOfItem
            items={filteredOrders}
            renderItem={(order) => (
              <OrderListItem order={order}>
                <EditAnEntity title="Изменить приказ">
                  <UpdateOrderForm
                    order={order}
                    onOrderUpdated={handleOpenSnackbar}
                    onOrderUpdatedError={handleOpenSnackbarError}
                  />
                </EditAnEntity>
              </OrderListItem>
            )}
            getKey={(order) => order.ТабельныйНомер}
          />
        </Stack>
      )}
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Операция выполнена успешно!"
        severity="success"
      />
      <NotificationSnackbar
        open={openSnackbarError}
        onClose={handleCloseSnackbarError}
        message="Ошибка при выполнении операции!"
        severity="error"
      />
    </Container>
  );
};
