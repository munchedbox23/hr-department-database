import { useForm } from "@/shared/lib/hooks/useForm";
import { Box, Button, TextField } from "@mui/material";
import { LoginSchema } from "../../model/types/loginTypes";
import { PasswordInput } from "@/shared/ui/PasswordInput";
import { useLoginMutation } from "../../api/loginApi";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { formState, handleChange } = useForm<LoginSchema>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        gap: "30px",
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
        sx={{ height: "35px" }}
      />
      <PasswordInput
        name="password"
        label="Пароль"
        onChange={handleChange}
        value={formState.password}
      />
      <Button type="submit" variant="outlined" sx={{ width: "100%" }}>
        Войти
      </Button>
    </Box>
  );
};
