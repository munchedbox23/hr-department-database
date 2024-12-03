import { TextField } from "@mui/material";
import { useForm } from "@/shared/lib/hooks/useForm";
import { useGetEmployeesQuery } from "@/entities/employee";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { BaseForm } from "@/shared/ui/BaseForm";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import {
  DepartmentRecord,
  useAddDepartmentMutation,
  useGetDepartmentQuery,
} from "@/entities/department";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import {
  validateDepartmentName,
  validateRoomNumber,
} from "@/shared/lib/validate";
import { validateManagerNumber } from "@/features/department/createDepartment/model/validateDepartmentForm";

export const CreateDepartmentForm = ({
  onDepartmentAdded,
  onDepartmentAddedError,
}: {
  onDepartmentAdded: () => void;
  onDepartmentAddedError: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<DepartmentRecord, "КодОтдела">
  >({
    ТабельныйНомерРуководителя: undefined,
    Название: "",
    НомерКабинета: undefined,
  });

  const { closeModal } = useModalContext();

  const [addDepartment, { isLoading }] = useAddDepartmentMutation();
  const { data: employees = [] } = useGetEmployeesQuery();
  const { data: departments = [] } = useGetDepartmentQuery();

  const { errors, validateForm } = useValidation<
    Omit<DepartmentRecord, "КодОтдела" | "ТабельныйНомерРуководителя">
  >({
    Название: (value) => validateDepartmentName(value as string, departments),
    НомерКабинета: (value) =>
      validateRoomNumber(value as string | number | undefined, departments),
  });

  // Filter out terminated employees
  const activeEmployees = employees.filter(
    (employee) => employee?.ДатаУвольнения === "NULL"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await addDepartment({
        ...formState,
        ТабельныйНомерРуководителя: Number(
          formState.ТабельныйНомерРуководителя
        ),
        НомерКабинета: Number(formState.НомерКабинета),
      }).unwrap();
      onDepartmentAdded();
    } catch (error) {
      onDepartmentAddedError();
    } finally {
      closeModal();
    }
  };

  return (
    <BaseForm
      buttonText="Добавить"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <TextField
        type="text"
        name="Название"
        label="Название"
        autoComplete="off"
        value={formState.Название}
        variant="outlined"
        onChange={handleChange}
        fullWidth
        error={!!errors.Название}
        helperText={errors.Название}
      />
      <CustomSelect
        label="Руководитель"
        name="ТабельныйНомерРуководителя"
        value={formState.ТабельныйНомерРуководителя?.toString() || ""}
        options={activeEmployees.map((employee) => ({
          value: employee.ТабельныйНомер.toString(),
          label: employee.ФИО,
        }))}
        onChange={handleChange}
      />
      <TextField
        type="number"
        name="НомерКабинета"
        label="Номер кабинета"
        autoComplete="off"
        value={formState.НомерКабинета}
        variant="outlined"
        onChange={handleChange}
        fullWidth
        error={!!errors.НомерКабинета}
        helperText={errors.НомерКабинета}
      />
    </BaseForm>
  );
};
