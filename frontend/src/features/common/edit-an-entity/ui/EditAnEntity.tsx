import { Button } from "@mui/material";
import { ModalWithOverlay } from "@/shared/ui/Modal";
import { PropsWithChildren, useState } from "react";
import { useAppSelector } from "@/app/providers/StoreProvider";

export const EditAnEntity = ({
  title,
  children,
}: PropsWithChildren<{
  title: string;
}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const userDate = useAppSelector((store) => store.user.user);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {userDate?.role === "admin" && (
        <Button
          sx={{
            my: 0.3,
            maxWidth: "250px",
            marginLeft: "12px",
          }}
          color="primary"
          variant="contained"
          onClick={openModal}
        >
          Изменить
        </Button>
      )}
      <ModalWithOverlay title={title} onClose={closeModal} open={isOpen}>
        {children}
      </ModalWithOverlay>
    </>
  );
};
