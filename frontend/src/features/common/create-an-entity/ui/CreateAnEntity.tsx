import { Button } from "@mui/material";
import { ModalWithOverlay } from "@/shared/ui/Modal";
import { FC, PropsWithChildren } from "react";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import { useAppSelector } from "@/app/providers/StoreProvider";

export const CreateAnEntity: FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ title, children }) => {
  const { isOpen, openModal, closeModal } = useModalContext();
  const userDate = useAppSelector((store) => store.user.user);

  return (
    <>
      {userDate?.role === "admin" && (
        <Button
          sx={{ my: 2 }}
          color="primary"
          variant="contained"
          onClick={openModal}
        >
          {title}
        </Button>
      )}
      <ModalWithOverlay title={title} onClose={closeModal} open={isOpen}>
        {children}
      </ModalWithOverlay>
    </>
  );
};
