import { useForm } from "@/shared/lib/hooks/useForm";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { PasswordInput } from "@/shared/ui/PasswordInput";
import { checkUserAuth, useLoginMutation } from "@/entities/user";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "@/shared/lib/validate";
import { appRoutes } from "@/shared/const/routes";
import { IUserLogin } from "@/entities/user";
import { useAppDispatch } from "@/app/providers/StoreProvider";
import { useValidation } from "@/shared/lib/hooks/useValidate";

export const LoginForm = () => {
  const { formState, handleChange } = useForm<IUserLogin>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading: isUserLogin }] = useLoginMutation();

  const { errors, validateForm } = useValidation<IUserLogin>({
    email: (value) => validateEmail(value as string),
    password: (value) => validatePassword(value as string),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await login(formState)
        .unwrap()
        .then(() => {
          dispatch(checkUserAuth()).then(() =>
            navigate(appRoutes.home(), { replace: true })
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "100%",
        maxWidth: "280px",
      }}
    >
      <TextField
        type="email"
        name="email"
        label="Email"
        onChange={handleChange}
        autoComplete="email"
        value={formState.email}
        sx={{ minHeight: "35px" }}
        error={!!errors.email}
        helperText={errors.email}
      />
      <PasswordInput
        name="password"
        label="Пароль"
        onChange={handleChange}
        value={formState.password}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        type="submit"
        variant="outlined"
        sx={{ width: "100%", position: "relative" }}
        disabled={isUserLogin}
      >
        {isUserLogin && <CircularProgress size={24} sx={{ marginRight: 1 }} />}
        {!isUserLogin && "Войти"}
      </Button>
    </Box>
  );
};
