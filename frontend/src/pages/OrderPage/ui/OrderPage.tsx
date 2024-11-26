import React from "react";
import { Container, Typography, Stack } from "@mui/material";
import { ListOfItem } from "@/widgets/ListOfItem";
import { OrderListItem, useGetOrdersQuery } from "@/entities/orders";
import { ListItemSkeleton } from "@/shared/ui/ListItemSkeleton";
import { CreateOrderForm } from "@/features/orders/createOrder";
import { CreateAnEntity } from "@/features/common/create-an-entity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";
import { EditAnEntity } from "@/features/common/edit-an-entity";
import { UpdateOrderForm } from "@/features/orders/updateOrder";

export const OrdersPage: React.FC = () => {
  const { data: orders = [], isLoading } = useGetOrdersQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Трудовые договоры
        </Typography>
        <CreateAnEntity title="Добавить трудовой договор">
          <CreateOrderForm onOrderAdded={handleOpenSnackbar} />
        </CreateAnEntity>
      </Stack>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <ListItemSkeleton key={index} />
        ))
      ) : (
        <ListOfItem
          items={orders}
          renderItem={(order) => (
            <OrderListItem order={order}>
              <EditAnEntity title="Изменить договор">
                <UpdateOrderForm
                  order={order}
                  onOrderAdded={handleOpenSnackbar}
                />
              </EditAnEntity>
            </OrderListItem>
          )}
          getKey={(order) => order.ТабельныйНомер}
        />
      )}
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
          message="Операция выполнена успешно!"
        severity="success"
      />
    </Container>
  );
};
