import { Button } from "@mui/material";
import { ModalWithOverlay } from "@/shared/ui/Modal";
import { FC, PropsWithChildren, useEffect } from "react";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import { useAppSelector } from "@/app/providers/StoreProvider";
import { useGetFreeJobTitleQuery } from "@/entities/employee";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar";

export const CreateAnEntity: FC<
  PropsWithChildren<{
    title: string;
    tableType?: string;
    pageName?: string;
  }>
> = ({ title, children, tableType, pageName }) => {
  const { isOpen, openModal, closeModal } = useModalContext();
  const userDate = useAppSelector((store) => store.user.user);
  const { data: freeJobTitles = [], refetch } = useGetFreeJobTitleQuery();
  const { handleOpenSnackbar, openSnackbar, handleCloseSnackbar } =
    useSnackbar();

  const isButtonVisible =
    userDate?.role === "admin" || ["отпуска"].includes(tableType || "");

  const handleButtonClick = () => {
    if (freeJobTitles.length === 0 && pageName === "сотрудники") {
      handleOpenSnackbar();
    } else {
      openModal();
    }
  };

  useEffect(() => {
   refetch()
  }, [freeJobTitles]);

  return (
    <>
      {isButtonVisible && (
        <Button
          sx={{ my: 2 }}
          color="primary"
          variant="contained"
          onClick={handleButtonClick}
        >
          {title}
        </Button>
      )}
      <ModalWithOverlay title={title} onClose={closeModal} open={isOpen}>
        {children}
      </ModalWithOverlay>
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Нет свободных вакансий"
        severity="error"
      />
    </>
  );
};
