import { useState } from "react";

type ValidationFunction = (value: any) => string;

export const useValidation = (formState: any, validationRules: Record<string, ValidationFunction>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    for (const field in validationRules) {
      const error = validationRules[field](formState[field]);
      if (error) {
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  return { errors, validateForm };
};
