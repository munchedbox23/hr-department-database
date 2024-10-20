import { useForm } from "@/shared/lib/hooks/useForm";
import { Box, Button, TextField } from "@mui/material";
import { LoginSchema } from "../../model/types/loginTypes";
import { PasswordInput } from "@/shared/ui/PasswordInput";
import { useLoginMutation } from "../../api/loginApi";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { validateEmail, validatePassword } from "@/shared/lib/validate";
import { useState } from "react";
=======
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70

export const LoginForm = () => {
  const { formState, handleChange } = useForm<LoginSchema>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

<<<<<<< HEAD
  const [errors, setErrors] = useState<LoginSchema>({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();

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
=======
  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
    try {
      await login(formState)
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
<<<<<<< HEAD
        gap: "15px",
=======
        gap: "30px",
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
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
<<<<<<< HEAD
        sx={{ minHeight: "35px" }}
        error={!!errors.email}
        helperText={errors.email}
=======
        sx={{ height: "35px" }}
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
      />
      <PasswordInput
        name="password"
        label="Пароль"
        onChange={handleChange}
        value={formState.password}
<<<<<<< HEAD
        error={!!errors.password}
        helperText={errors.password}
=======
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
      />
      <Button type="submit" variant="outlined" sx={{ width: "100%" }}>
        Войти
      </Button>
    </Box>
  );
};
