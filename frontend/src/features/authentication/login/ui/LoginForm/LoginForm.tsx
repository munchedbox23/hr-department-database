import { useForm } from "@/shared/lib/hooks/useForm";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { LoginSchema } from "../../model/types/loginTypes";
import { PasswordInput } from "@/shared/ui/PasswordInput";
import { useLoginMutation } from "../../api/loginApi";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "@/shared/lib/validate";
import { useState } from "react";
import { appRoutes } from "@/shared/const/routes";

export const LoginForm = () => {
  const { formState, handleChange } = useForm<LoginSchema>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState<LoginSchema>({
    email: "",
    password: "",
  });
  const [login, { isLoading: isUserLogin }] = useLoginMutation();

  const validateForm = () => {
    const passwordError = validatePassword(formState.password ?? "");
    const emailError = validateEmail(formState.email ?? "");

    setErrors({
      password: passwordError || "",
      email: emailError || "",
    });

    return !passwordError && !emailError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await login(formState)
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
        sx={{ width: "100%", postion: "relative" }}
        disabled={isUserLogin}
      >
        {isUserLogin && <CircularProgress size={24} sx={{ marginRight: 1 }} />}
        {!isUserLogin && "Войти"}
      </Button>
    </Box>
  );
};
