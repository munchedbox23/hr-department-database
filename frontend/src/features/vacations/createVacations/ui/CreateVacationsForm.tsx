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
  calculateDaysBetweenDates,
} from "../model/validationVacatioForm";
import { useAppSelector } from "@/app/providers/StoreProvider";

export const CreateVacationsForm = ({
  onVacationAdded,
  onVacationAddedError,
}: {
  onVacationAdded: () => void;
  onVacationAddedError: () => void;
}) => {
  const { data: employeesData } = useGetEmployeesQuery();
  const user = useAppSelector((state) => state.user?.user) || null;

  const initialFormState = {
    ТабельныйНомер:
      user?.role === "employee" && employeesData?.length === 1
        ? employeesData[0].ТабельныйНомер
        : undefined,
    ВидОтпуска: "",
    ДатаОтпуска: "",
    ДатаОкончания: "",
    КоличествоДней: undefined,
    Основание: "",
    Статус: user?.role === "admin" ? "принято" : "не принято" as "принято" | "не принято",
  };

  const { formState, handleChange, setFormState } =
    useForm<Omit<Vacation, "НомерЗаписи">>(initialFormState);
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

  const filteredEmployees = employeesData?.filter(
    (employee) => employee.ДатаУвольнения === "NULL"
  );

  const employeeOption =
    user?.role === "employee" && filteredEmployees?.length === 1
      ? [
          {
            value: filteredEmployees[0].ТабельныйНомер.toString(),
            label: filteredEmployees[0].ТабельныйНомер.toString(),
          },
        ]
      : filteredEmployees?.map((employee) => ({
          value: employee.ТабельныйНомер.toString(),
          label: employee.ТабельныйНомер.toString(),
        })) || [];

  const employeeValue =
    user?.role === "employee" && filteredEmployees?.length === 1
      ? filteredEmployees[0].ТабельныйНомер.toString()
      : formState.ТабельныйНомер?.toString() || "";

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    const { name, value } = event.target;
    if (name === "ДатаОтпуска" || name === "ДатаОкончания") {
      const { ДатаОтпуска, ДатаОкончания } = formState;
      const startDate = name === "ДатаОтпуска" ? value : ДатаОтпуска;
      const endDate = name === "ДатаОкончания" ? value : ДатаОкончания;
      if (startDate && endDate) {
        const days = calculateDaysBetweenDates(startDate, endDate);
        setFormState((prevState) => ({
          ...prevState,
          КоличествоДней: days,
        }));
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await addVacation({
        ...formState,
        ТабельныйНомер: Number(formState.ТабельныйНомер),
        КоличествоДней: Number(formState.КоличествоДней),
      }).unwrap();
      onVacationAdded();
      closeModal();
    } catch (error) {
      closeModal();
      onVacationAddedError();
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
        options={employeeOption}
        value={employeeValue}
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
        onChange={handleDateChange}
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
        onChange={handleDateChange}
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
        inputProps={{ min: 1, max: 14 }}
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
