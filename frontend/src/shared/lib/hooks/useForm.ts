import { ChangeEvent, useState } from "react";

export const useForm = <T>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return { formState, setFormState, handleChange };
};
