import React from "react";
import styles from "./BaseForm.module.css";
import { Button, CircularProgress } from "@mui/material";

interface BaseFormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  isLoading: boolean;
}

export const BaseForm: React.FC<BaseFormProps> = ({
  children,
  className,
  onSubmit,
  buttonText,
  isLoading,
}) => {
  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      className={`${styles.form} ${className}`}
    >
      {children}
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : buttonText}
      </Button>
    </form>
  );
};
