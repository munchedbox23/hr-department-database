import { Loader } from "@/shared/ui/Loader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { Storage } from "@mui/icons-material";

export const AuthLayout = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
        width: "100vw",
        height: "100vh",
        paddingTop: "100px",
      }}
    >
      <Suspense fallback={<Loader />}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "70px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Storage
              sx={{
                fontSize: 60,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                borderRadius: "50%",
                padding: "10px",
                color: "white",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#1976D2",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              База данных
            </Typography>
          </Box>

          <Outlet />
        </Box>
      </Suspense>
    </Container>
  );
};
