import { useState } from "react";

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

type Validator<T> = (value: T[keyof T]) => string | null;

export const useValidation = <T extends Record<string, any>>(validators: {
  [K in keyof T]: Validator<T>;
}) => {
  const [errors, setErrors] = useState<ValidationErrors<T>>({});

  const validateForm = (formState: T): boolean => {
    const newErrors: ValidationErrors<T> = {};

    for (const key in validators) {
      const error = validators[key](formState[key]);
      if (error) {
        newErrors[key] = error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};
