import { Button, TextField, CircularProgress } from "@mui/material";
import { useForm } from "@/shared/lib/hooks/useForm";
import { Employee, EmployeePosition } from "@/entities/employee";
import { useAddEmployeeMutation } from "@/entities/employee";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import MaskedInput from "react-text-mask";
import { phoneMask } from "../model/const/constants";
import { useState } from "react";
import { validateUsername } from "@/shared/lib/validate/validateUsername";
import { validateEmail } from "@/shared/lib/validate/validateEmail";
import { validateAddress } from "../model/lib/validateForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";

export const CreateAnEmployeeForm = ({
  positions,
  onEmployeeAdded,
}: {
  positions: EmployeePosition[];
  onEmployeeAdded: () => void;
}) => {
  const { formState, handleChange } = useForm<Omit<Employee, "ТабельныйНомер">>(
    {
      ФИО: "",
      Пол: "м",
      КодДолжности: "",
      Телефон: "",
      Прописка: "",
      Образование: "",
      ДатаПриема: new Date().toISOString().split("T")[0],
      Почта: "",
      СемейноеПоложение: "холост",
    }
  );

  const { closeModal } = useModalContext();

  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const [errors, setErrors] = useState({
    ФИО: "",
    Почта: "",
    Прописка: "",
  });

  const validateForm = () => {
    const nameError = validateUsername(formState.ФИО);
    const emailError = validateEmail(formState.Почта);
    const addressError = validateAddress(formState.Прописка);

    const newErrors = {
      ФИО: nameError || "",
      Почта: emailError || "",
      Прописка: addressError || "",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    await addEmployee(formState);
    onEmployeeAdded();
    closeModal();
  };

  return (
    <BaseForm onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="ФИО"
        label="ФИО"
        autoComplete="off"
        value={formState.ФИО}
        variant="outlined"
        onChange={handleChange}
        error={!!errors.ФИО}
        helperText={errors.ФИО}
        fullWidth
      />
      <CustomSelect
        label="Пол"
        name="Пол"
        value={formState.Пол}
        options={[
          { value: "м", label: "Мужской" },
          { value: "ж", label: "Женский" },
        ]}
        onChange={handleChange}
      />
      <CustomSelect
        label="Должность"
        name="КодДолжности"
        value={
          formState.КодДолжности !== null
            ? formState.КодДолжности.toString()
            : ""
        }
        options={positions.map((position) => ({
          value: position.Название.toString(),
          label: position.Название,
        }))}
        onChange={handleChange}
      />
      <TextField
        type="number"
        name="Стаж"
        label="Стаж"
        value={Number(formState.Стаж) || ""}
        variant="outlined"
        onChange={handleChange}
        inputProps={{ min: 0 }}
        fullWidth
      />
      <MaskedInput
        mask={phoneMask}
        value={formState.Телефон}
        onChange={handleChange}
        render={(ref, props) => (
          <TextField
            {...props}
            inputRef={ref}
            type="tel"
            name="Телефон"
            label="Телефон"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <TextField
        type="text"
        name="Прописка"
        label="Прописка"
        value={formState.Прописка}
        variant="outlined"
        onChange={handleChange}
        error={!!errors.Прописка}
        helperText={errors.Прописка}
        fullWidth
      />
      <CustomSelect
        label="Образование"
        name="Образование"
        value={formState.Образование}
        options={[
          { value: "среднее", label: "Среднее" },
          { value: "высшее", label: "Высшее" },
          { value: "неоконченное высшее", label: "Неоконченное высшее" },
          { value: "среднее специальное", label: "Среднее специальное" },
          { value: "профессиональное", label: "Профессиональное" },
        ]}
        onChange={handleChange}
      />
      <TextField
        type="date"
        name="ДатаПриема"
        label="Дата Приема"
        value={formState.ДатаПриема}
        variant="outlined"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
      <TextField
        type="email"
        name="Почта"
        label="Почта"
        value={formState.Почта}
        variant="outlined"
        onChange={handleChange}
        error={!!errors.Почта}
        helperText={errors.Почта}
        fullWidth
      />
      <CustomSelect
        label="Семейное Положение"
        name="СемейноеПоложение"
        value={formState.СемейноеПоложение}
        options={[
          { value: "холост", label: "Холост" },
          { value: "женат", label: "Женат" },
          { value: "замужем", label: "Замужем" },
          { value: "разведена", label: "Разведена" },
          { value: "разведен", label: "Разведен" },
          { value: "вдовец", label: "Вдовец" },
          { value: "вдова", label: "Вдова" },
        ]}
        onChange={handleChange}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Добавить"}
      </Button>
    </BaseForm>
  );
};
