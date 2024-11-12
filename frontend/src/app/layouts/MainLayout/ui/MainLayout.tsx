import { FC, Suspense } from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppHeader } from "@/widgets/Header";
import { Loader } from "@/shared/ui/Loader";
import { useLogoutMutation } from "@/entities/user";
import { ModalProvider } from "@/app/providers/ModalProvider";

export const MainLayout: FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <>
      <AppHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          component="main"
          sx={{
            width: "100%",
            position: "relative",
            minHeight: "calc(100vh - 75px)",
            height: "auto",
            maxHeight: "100%",
            background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            <ModalProvider>
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </ModalProvider>
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
      )}
    </>
  );
};
