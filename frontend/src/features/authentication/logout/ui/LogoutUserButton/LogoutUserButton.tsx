import { FC } from "react";
import { Button, Typography } from "@mui/material";
import { checkUserAuth, useLogoutMutation } from "@/entities/user";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/shared/const/routes";
import { useAppDispatch } from "@/app/providers/StoreProvider";
import { resetUser } from "@/entities/user/model/slice/authSlice";

export const LogoutUserButton: FC = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout()
        .unwrap()
        .then(() => {
          dispatch(resetUser());
          dispatch(checkUserAuth()).then(() => {
            navigate(appRoutes.auth(), { replace: true });
          });
        });
    } catch (error) {
      console.error("Ошибка при выходе", error);
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      <Typography variant="button">Выход</Typography>
    </Button>
  );
};
