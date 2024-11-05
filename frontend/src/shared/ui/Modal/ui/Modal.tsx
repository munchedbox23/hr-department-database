import { createPortal } from "react-dom";
import { FC, PropsWithChildren, memo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

type TModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
};

export const ModalWithOverlay: FC<PropsWithChildren<TModalProps>> = memo(
  ({ children, onClose, open, title }) => {
    return createPortal(
      <Modal open={open} onClose={onClose}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: 300,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            transitionDuration: "300ms",
            transitionProperty: "all",
            transitionTimingFunction: "linear",
          }}
        >
          <Stack
            direction="column"
            sx={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 1150,
              textAlign: "center",
              width: "35%",
              padding: "1rem",
              minHeight: "25rem",
              maxHeight: "55rem",
              borderRadius: "1.5rem",
              backgroundColor: "rgb(241 245 249)",
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              sx={{ marginBottom: "1.5rem" }}
            >
              {title && (
                <Typography
                  sx={{
                    flexGrow: 1,
                    textAlign: "left",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </Typography>
              )}
              <CloseIcon
                onClick={onClose}
                sx={{
                  position: "absolute",
                  top: "1rem",
                  transition: "color 600ms ease",
                  fontSize: "1.8rem",
                  right: "1rem",
                  cursor: "pointer",
                  color: "gray",
                  "&:hover": {
                    color: "black",
                  },
                }}
              />
            </Stack>
            <Box
              component="main"
              sx={{ width: "100%", height: "100%", paddingBottom: "15px" }}
            >
              {children}
            </Box>
          </Stack>
        </Stack>
      </Modal>,
      document.getElementById("modal") as HTMLElement
    );
  }
);
