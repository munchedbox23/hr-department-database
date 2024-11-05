import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { Order } from "@/entities/orders/model/types/types";

interface OrderListItemProps {
  order: Order;
}

export const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2, padding: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          <span style={{ color: '#1E90FF' }}>№{order.НомерПриказа}</span> - {order.Содержание}
        </Typography>
        <Divider />
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          Дата оформления: {order.ДатаОформления}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Табельный номер: {order.ТабельныйНомер}
        </Typography>
      </CardContent>
    </Card>
  );
};
