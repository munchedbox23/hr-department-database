import React from "react";
import { Card, CardContent, Divider, Skeleton } from "@mui/material";

export const ListItemSkeleton: React.FC = () => {
  return (
    <Card
      variant="outlined"
      sx={{ marginBottom: 2, padding: 2, borderRadius: 2 }}
    >
      <CardContent>
        <Skeleton variant="text" width={210} height={30} />
        <Divider />
        <Skeleton
          variant="text"
          width={150}
          height={20}
          sx={{ marginTop: 1 }}
        />
        <Skeleton variant="text" width={150} height={20} />
      </CardContent>
    </Card>
  );
};
