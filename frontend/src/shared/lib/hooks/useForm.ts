import { ChangeEvent, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

export const useForm = <T>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
      | { target: { name: string; value: any } }
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormState(initialState);
  };

  return { formState, setFormState, handleChange, handleReset };
};
