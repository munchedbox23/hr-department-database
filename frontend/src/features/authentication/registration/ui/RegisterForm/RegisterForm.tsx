import { useForm } from "@/shared/lib/hooks/useForm";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { PasswordInput } from "@/shared/ui/PasswordInput";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/shared/const/routes";
import { checkUserAuth, useRegisterMutation } from "@/entities/user";
import { IUserRegister } from "@/entities/user";
import { useAppDispatch } from "@/app/providers/StoreProvider";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/shared/lib/validate";
import { useValidation } from "@/shared/lib/hooks/useValidate";

export const RegisterForm = () => {
  const { formState, handleChange } = useForm<IUserRegister>({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const [register, { isLoading: isUserRegister }] = useRegisterMutation();
  const navigate = useNavigate();

  const { errors, validateForm } = useValidation<IUserRegister>({
    name: (value) => validateName(value as string),
    email: (value) => validateEmail(value as string),
    password: (value) => validatePassword(value as string),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await register(formState)
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
        gap: "16px",
        width: "100%",
        maxWidth: "280px",
      }}
    >
      <TextField
        type="text"
        name="name"
        label="Ваше имя"
        autoComplete="off"
        onChange={handleChange}
        value={formState.name}
        sx={{ minHeight: "35px" }}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        type="email"
        name="email"
        label="Email"
        onChange={handleChange}
        autoComplete="off"
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
        autoComplete="new-password"
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button type="submit" variant="outlined" disabled={isUserRegister}>
        {isUserRegister && (
          <CircularProgress size={24} sx={{ marginRight: 1 }} />
        )}
        {!isUserRegister && "Зарегистрироваться"}
      </Button>
    </Box>
  );
};
