import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  autoComplete?: "off" | "new-password" | "current-password";
  error?: boolean;
  helperText?: string;
}

export const PasswordInput = ({
  value,
  onChange,
  name,
  label,
  autoComplete = "off",
  error,
  helperText,
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
      error={error}
      helperText={helperText}
      value={value}
      sx={{ minHeight: "35px" }}
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
