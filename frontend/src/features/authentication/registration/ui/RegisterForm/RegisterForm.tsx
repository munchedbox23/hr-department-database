import { useForm } from "@/shared/lib/hooks/useForm";
import { Box, Button, TextField } from "@mui/material";
import { RegisterSchema } from "../../model/types/registerTypes";
import { PasswordInput } from "@/shared/ui/PasswordInput";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/registerApi";

export const RegisterForm = () => {
  const { formState, handleChange } = useForm<RegisterSchema>({
    name: "",
    email: "",
    password: "",
  });

  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        sx={{ height: "48px" }}
      />
      <TextField
        type="email"
        name="email"
        label="Email"
        onChange={handleChange}
        autoComplete="off"
        value={formState.email}
        sx={{ height: "48px" }}
      />
      <PasswordInput
        name="password"
        label="Пароль"
        onChange={handleChange}
        value={formState.password}
        autoComplete="new-password"
      />
      <Button type="submit" variant="outlined">
        Зарегистрироваться
      </Button>
    </Box>
  );
};
