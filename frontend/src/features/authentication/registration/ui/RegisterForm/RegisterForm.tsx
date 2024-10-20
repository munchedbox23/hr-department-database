import { useForm } from "@/shared/lib/hooks/useForm";
import { Box, Button, TextField } from "@mui/material";
import { RegisterSchema } from "../../model/types/registerTypes";
import { PasswordInput } from "@/shared/ui/PasswordInput";
<<<<<<< HEAD
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/registerApi";
import {
  validateUsername,
  validatePassword,
  validateEmail,
} from "@/shared/lib/validate";
=======
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/registerApi";
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70

export const RegisterForm = () => {
  const { formState, handleChange } = useForm<RegisterSchema>({
    name: "",
    email: "",
    password: "",
  });

<<<<<<< HEAD
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

=======
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
<<<<<<< HEAD
    if (!validateForm()) return;
=======
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
    try {
      await register(formState)
        .unwrap()
        .then(() => navigate("/", { replace: true }));
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
<<<<<<< HEAD
        sx={{ minHeight: "35px" }}
        error={!!errors.name}
        helperText={errors.name}
=======
        sx={{ height: "48px" }}
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
      />
      <TextField
        type="email"
        name="email"
        label="Email"
        onChange={handleChange}
        autoComplete="off"
        value={formState.email}
<<<<<<< HEAD
        sx={{ minHeight: "35px" }}
        error={!!errors.email}
        helperText={errors.email}
=======
        sx={{ height: "48px" }}
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
      />
      <PasswordInput
        name="password"
        label="Пароль"
        onChange={handleChange}
        value={formState.password}
        autoComplete="new-password"
<<<<<<< HEAD
        error={!!errors.password}
        helperText={errors.password}
=======
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
      />
      <Button type="submit" variant="outlined">
        Зарегистрироваться
      </Button>
    </Box>
  );
};
