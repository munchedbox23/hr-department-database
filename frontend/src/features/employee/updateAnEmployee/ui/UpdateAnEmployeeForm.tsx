import { TextField } from "@mui/material";
import { useForm } from "@/shared/lib/hooks/useForm";
import {
  Employee,
  EmployeePosition,
  useUpdateEmployeeMutation,
} from "@/entities/employee";
import { useGetEmployeesQuery } from "@/entities/employee";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import MaskedInput from "react-text-mask";
import { BaseForm } from "@/shared/ui/BaseForm";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import { validatePhoneNumber, validateEmail } from "@/shared/lib/validate";
import { phoneMask } from "../../createAnEmployee/model/const/constants";
import {
  validateExperience,
  validateAddress,
  validateTerminationDate,
  validateFullName,
  validateDateOfBirth,
} from "../../createAnEmployee/model/lib/validateForm";
import { useGetDepartmentQuery } from "@/entities/staffing";

export const UpdateAnEmployeeForm = ({
  employee,
  positions,
  onEmployeeAdded,
  onEmployeeAddedError,
}: {
  employee: Employee;
  positions: EmployeePosition[];
  onEmployeeAdded: () => void;
  onEmployeeAddedError: () => void;
}) => {
  const { formState, handleChange } = useForm<Omit<Employee, "ТабельныйНомер">>(
    { ...employee }
  );

  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const { data: employees } = useGetEmployeesQuery();

  const existingPhones = employees
    ?.map((employee) => employee.Телефон)
    .filter((phone) => phone !== employee.Телефон);
  const existingEmails = employees
    ?.map((employee) => employee.Почта)
    .filter((email) => email !== employee.Почта);
  const { data: departments = [] } = useGetDepartmentQuery();

  const { errors, validateForm } = useValidation<
    Pick<
      Employee,
      | "ФИО"
      | "Стаж"
      | "Телефон"
      | "Почта"
      | "Прописка"
      | "ДатаУвольнения"
      | "ДатаРождения"
    >
  >({
    ФИО: (value) => validateFullName(value as string),
    Стаж: (value) => validateExperience(value as string | number | undefined),
    Телефон: (value) =>
      validatePhoneNumber(value as string, existingPhones ?? []),
    Почта: (value) => validateEmail(value as string, existingEmails ?? []),
    Прописка: (value) => validateAddress(value as string),
    ДатаУвольнения: (value) => {
      if (value === null || value === "NULL" || value === "") {
        return null;
      }
      return validateTerminationDate(value as string);
    },
    ДатаРождения: (value) => validateDateOfBirth(value as string),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    const payload = { ...formState };
    if (payload.Стаж === "") {
      delete payload.Стаж;
    }
    if (
      payload.ДатаУвольнения === "NULL" ||
      payload.ДатаУвольнения === null ||
      payload.ДатаУвольнения === ""
    ) {
      delete payload.ДатаУвольнения;
    }
    try {
      await updateEmployee({
        employee: payload,
        id: employee.ТабельныйНомер,
      }).unwrap();
      onEmployeeAdded();
    } catch (error) {
      onEmployeeAddedError();
      console.log(error);
    }
  };

  return (
    <BaseForm
      buttonText="Изменить"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <TextField
        type="text"
        name="ФИО"
        label="ФИО"
        autoComplete="off"
        value={formState.ФИО}
        variant="outlined"
        onChange={handleChange}
        fullWidth
        error={!!errors.ФИО}
        helperText={errors.ФИО}
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
      <TextField
        type="date"
        name="ДатаРождения"
        label="Дата Рождения"
        value={formState.ДатаРождения}
        variant="outlined"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        error={!!errors.ДатаРождения}
        helperText={errors.ДатаРождения}
      />
      <CustomSelect
        label="Должность"
        name="КодДолжности"
        value={formState.КодДолжности.toString() || ""}
        options={positions.map((position) => ({
          value: position.Название.toString(),
          label: position.Название,
        }))}
        onChange={handleChange}
      />
      <CustomSelect
        label="Отдел"
        name="КодОтдела"
        value={formState.КодОтдела.toString() || ""}
        options={departments.map((department) => ({
          value: department.Название.toString(),
          label: department.Название,
        }))}
        onChange={handleChange}
      />
      <TextField
        type="number"
        name="Стаж"
        label="Стаж"
        value={formState.Стаж || ""}
        variant="outlined"
        onChange={handleChange}
        inputProps={{ min: 0, max: 100 }}
        fullWidth
        error={!!errors.Стаж}
        helperText={errors.Стаж}
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
            error={!!errors.Телефон}
            helperText={errors.Телефон}
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
        fullWidth
        error={!!errors.Прописка}
        helperText={errors.Прописка}
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
        required
      />
      <TextField
        type="email"
        name="Почта"
        label="Почта"
        value={formState.Почта}
        variant="outlined"
        onChange={handleChange}
        fullWidth
        error={!!errors.Почта}
        helperText={errors.Почта}
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
      <TextField
        type="date"
        name="ДатаУвольнения"
        label="Дата Увольнения"
        value={formState.ДатаУвольнения || ""}
        variant="outlined"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        error={!!errors.ДатаУвольнения}
        helperText={errors.ДатаУвольнения}
      />
    </BaseForm>
  );
};
