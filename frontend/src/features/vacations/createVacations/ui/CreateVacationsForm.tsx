import { Vacation } from "@/entities/vacations/model/types/types";
import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useGetEmployeesQuery } from "@/entities/employee";
import { TextField } from "@mui/material";
import { useAddVacationMutation } from "@/entities/vacations";
import { useModalContext } from "@/app/providers/ModalProvider";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import {
  validateVacationStartDate,
  validateEndDate,
  validatePurpose,
  validateNumberOfDays,
} from "../model/validationVacatioForm";

export const CreateVacationsForm = ({
  onVacationAdded,
}: {
  onVacationAdded: () => void;
}) => {
  const { data: employeesData } = useGetEmployeesQuery();
  const { formState, handleChange } = useForm<Omit<Vacation, "НомерЗаписи">>({
    ТабельныйНомер: undefined,
    ВидОтпуска: "",
    ДатаОтпуска: "",
    ДатаОкончания: "",
    КоличествоДней: undefined,
    Основание: "",
  });
  const [addVacation, { isLoading }] = useAddVacationMutation();
  const { closeModal } = useModalContext();

  const { errors, validateForm } = useValidation<
    Pick<
      Vacation,
      "ДатаОтпуска" | "ДатаОкончания" | "Основание" | "КоличествоДней"
    >
  >({
    ДатаОтпуска: (value) => validateVacationStartDate(value as string),
    ДатаОкончания: (value) =>
      validateEndDate(value as string, formState.ДатаОтпуска),
    Основание: (value) => validatePurpose(value as string),
    КоличествоДней: (value) =>
      validateNumberOfDays(
        formState.ДатаОтпуска,
        formState.ДатаОкончания,
        Number(value)
      ),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await addVacation({
        ...formState,
        ТабельныйНомер: Number(formState.ТабельныйНомер),
        КоличествоДней: Number(formState.КоличествоДней),
      });
      onVacationAdded();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BaseForm
      isLoading={isLoading}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <CustomSelect
        name="ТабельныйНомер"
        label="Табельный номер"
        options={Array.from({ length: employeesData?.length || 0 }, (_, i) => ({
          value: (i + 1).toString(),
          label: (i + 1).toString(),
        }))}
        value={formState.ТабельныйНомер?.toString() || ""}
        onChange={handleChange}
      />
      <CustomSelect
        name="ВидОтпуска"
        label="Вид отпуска"
        options={[
          { value: "Ежегодный", label: "Ежегодный" },
          { value: "Учебный", label: "Учебный" },
          {
            value: "Без сохранения заработной платы",
            label: "Без сохранения заработной платы",
          },
          { value: "Больничный", label: "Больничный" },
          {
            value: "Отпуск по беременности и родам",
            label: "Отпуск по беременности и родам",
          },
          {
            value: "Отпуск по уходу за ребенком",
            label: "Отпуск по уходу за ребенком",
          },
        ]}
        value={formState.ВидОтпуска}
        onChange={handleChange}
      />
      <TextField
        type="date"
        name="ДатаОтпуска"
        label="Дата отпуска"
        value={formState.ДатаОтпуска}
        variant="outlined"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        error={!!errors.ДатаОтпуска}
        helperText={errors.ДатаОтпуска}
      />
      <TextField
        type="date"
        name="ДатаОкончания"
        label="Дата окончания"
        value={formState.ДатаОкончания}
        variant="outlined"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        error={!!errors.ДатаОкончания}
        helperText={errors.ДатаОкончания}
      />
      <TextField
        type="number"
        name="КоличествоДней"
        label="Количество дней"
        value={Number(formState.КоличествоДней) || ""}
        variant="outlined"
        onChange={handleChange}
        inputProps={{ min: 0 }}
        fullWidth
        error={!!errors.КоличествоДней}
        helperText={errors.КоличествоДней}
      />
      <TextField
        name="Основание"
        label="Основание"
        value={formState.Основание}
        variant="outlined"
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        error={!!errors.Основание}
        helperText={errors.Основание}
      />
    </BaseForm>
  );
};
