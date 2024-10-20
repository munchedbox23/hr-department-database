import { useForm } from "@/shared/lib/hooks/useForm";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { RegisterSchema } from "../../model/types/registerTypes";
import { PasswordInput } from "@/shared/ui/PasswordInput";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/registerApi";
import {
  validateUsername,
  validatePassword,
  validateEmail,
} from "@/shared/lib/validate";
import { appRoutes } from "@/shared/const/routes";

export const RegisterForm = () => {
  const { formState, handleChange } = useForm<RegisterSchema>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<RegisterSchema>({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = (): boolean => {
    const usernameError = validateUsername(formState.name ?? "");
    const passwordError = validatePassword(formState.password ?? "");
    const emailError = validateEmail(formState.email ?? "");

    setErrors({
      name: usernameError || "",
      password: passwordError || "",
      email: emailError || "",
    });

    return !passwordError && !emailError && !usernameError;
  };

  const [register, { isLoading: isUserRegister }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await register(formState)
        .unwrap()
        .then(() => navigate(appRoutes.home(), { replace: true }));
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
