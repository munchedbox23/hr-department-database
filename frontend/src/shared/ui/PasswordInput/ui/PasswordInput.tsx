import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  autoComplete?: "off" | "new-password" | "current-password";
<<<<<<< HEAD
  error?: boolean;
  helperText?: string;
=======
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
}

export const PasswordInput = ({
  value,
  onChange,
  name,
  label,
  autoComplete = "off",
<<<<<<< HEAD
  error,
  helperText,
=======
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      name={name}
      label={label}
      onChange={onChange}
      autoComplete={autoComplete}
<<<<<<< HEAD
      error={error}
      helperText={helperText}
      value={value}
      sx={{ minHeight: "35px" }}
=======
      value={value}
      sx={{ height: "48px" }}
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
