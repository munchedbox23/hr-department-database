import React, { PropsWithChildren } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { ITrip } from "../../model/types/types";

export const TripsItem: React.FC<PropsWithChildren<{ trip: ITrip }>> = ({
  trip,
  children,
}) => {
  const { Организация, Город, Страна, СДата, ПоДату, КоличествоДней, Цель } = trip;

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, padding: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          <span style={{ color: "#1E90FF" }}>{Организация}</span>
        </Typography>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              {Город}, {Страна}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              С {СДата} по {ПоДату} ({КоличествоДней} дней)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Цель: {Цель}
            </Typography>
          </Box>

          <Box mt={2}>{children}</Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
