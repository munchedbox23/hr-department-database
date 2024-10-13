import { useForm } from "@/shared/lib/hooks/useForm";
import { Button, FormControl, TextField } from "@mui/material";
import { RegisterSchema } from "../../model/types/register-types";
import { PasswordInput } from "@/shared/ui/PasswordInput";

export const RegisterForm = () => {
  const { formState, handleChange } = useForm<RegisterSchema>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <FormControl onSubmit={() => 1}>
      <TextField
        type="text"
        name="name"
        label="Ваше имя"
        autoComplete="off"
        onChange={handleChange}
        value={formState.name}
        sx={{ height: "48px", marginBottom: "16px" }}
      />
      <TextField
        type="email"
        name="email"
        label="Email"
        onChange={handleChange}
        autoComplete="off"
        value={formState.email}
        sx={{ height: "48px", marginBottom: "16px" }}
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
    </FormControl>
  );
};
