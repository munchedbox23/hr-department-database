import { useForm } from "@/shared/lib/hooks/useForm";
import { Button, FormControl, TextField } from "@mui/material";
import { LoginSchema } from "../../model/types/login-types";
import { PasswordInput } from "@/shared/ui/PasswordInput";

export const LoginForm = () => {
  const { formState, handleChange } = useForm<LoginSchema>({
    email: "",
    password: "",
  });

  return (
    <FormControl onSubmit={() => 1}>
      <TextField
        type="email"
        name="email"
        label="Email"
        onChange={handleChange}
        autoComplete="email"
        value={formState.email}
        sx={{ height: "48px", marginBottom: "16px" }}
      />
      <PasswordInput
        name="password"
        label="Пароль"
        onChange={handleChange}
        value={formState.password}
      />
      <Button type="submit">Войти</Button>
    </FormControl>
  );
};
