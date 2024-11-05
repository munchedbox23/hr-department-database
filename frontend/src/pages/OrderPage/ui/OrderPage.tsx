import React from "react";
import { Container, Typography } from "@mui/material";
import { ListOfItem } from "@/widgets/ListOfItem";
import {
  OrderListItem,
  useGetOrdersQuery,
} from "@/entities/orders";
import { ListItemSkeleton } from "@/shared/ui/ListItemSkeleton";

export const OrdersPage: React.FC = () => {
  const { data: orders = [], isLoading } = useGetOrdersQuery();

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Трудовые договоры
      </Typography>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <ListItemSkeleton key={index} />
        ))
      ) : (
        <ListOfItem
          items={orders}
          renderItem={(order) => <OrderListItem order={order} />}
          getKey={(order) => order.ТабельныйНомер}
        />
      )}
    </Container>
  );
};
