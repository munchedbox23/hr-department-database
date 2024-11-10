import React from "react";
import styles from "./BaseForm.module.css";

interface BaseFormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const BaseForm: React.FC<BaseFormProps> = ({
  children,
  className,
  onSubmit,
}) => {
  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      className={`${styles.form} ${className}`}
    >
      {children}
    </form>
  );
};
