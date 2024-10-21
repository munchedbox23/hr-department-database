import { FC } from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppHeader } from "@/widgets/Header";

export const MainLayout: FC = () => {
  return (
    <>
      <AppHeader />
      <Box
        component="main"
        sx={{
          width: "100vw",
          position: "relative",
          height: "calc(100vh - 75px)",
          background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
            zIndex: 2,
            position: "relative",
          }}
        >
          <Outlet />
        </Container>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            backgroundImage:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(225deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%)",
            backgroundSize: "50px 50px",
            pointerEvents: "none",
          }}
        />
      </Box>
    </>
  );
};
