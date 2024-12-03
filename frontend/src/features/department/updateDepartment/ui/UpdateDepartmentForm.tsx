import { TextField } from "@mui/material";
import { useForm } from "@/shared/lib/hooks/useForm";
import { useGetEmployeesQuery } from "@/entities/employee";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { BaseForm } from "@/shared/ui/BaseForm";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import {
  DepartmentRecord,
  useUpdateDepartmentMutation,
  useGetDepartmentQuery,
} from "@/entities/department";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import {
  validateDepartmentName,
  validateRoomNumber,
} from "@/shared/lib/validate/validateDepartment";

export const UpdateDepartmentForm = ({
  department,
  onDepartmentAdded,
  onDepartmentUpdatedError,
}: {
  department: DepartmentRecord;
  onDepartmentAdded: () => void;
  onDepartmentUpdatedError: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<DepartmentRecord, "КодОтдела">
  >({
    ТабельныйНомерРуководителя:
      department.ТабельныйНомерРуководителя || undefined,
    Название: department.Название,
    НомерКабинета: department.НомерКабинета || undefined,
  });

  const { closeModal } = useModalContext();
  const { data: departments = [] } = useGetDepartmentQuery();
  const { errors, validateForm } = useValidation<
    Pick<DepartmentRecord, "Название" | "НомерКабинета">
  >({
    Название: (value) => validateDepartmentName(value as string, departments),
    НомерКабинета: (value) =>
      validateRoomNumber(value as string | number | undefined, departments),
  });

  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation();
  const { data: employees = [] } = useGetEmployeesQuery();

  const activeEmployees = employees.filter(
    (employee) => employee?.ДатаУвольнения === "NULL"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await updateDepartment({
        department: {
          ...formState,
          ТабельныйНомерРуководителя: Number(
            formState.ТабельныйНомерРуководителя
          ),
          НомерКабинета: Number(formState.НомерКабинета),
        },
        id: department.КодОтдела,
      }).unwrap();
      onDepartmentAdded();
      closeModal();
    } catch (error) {
      onDepartmentUpdatedError();
    }
  };

  return (
    <BaseForm
      buttonText="Обновить"
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
        options={
          activeEmployees?.map((employee) => ({
            value: employee.ТабельныйНомер.toString(),
            label: employee.ФИО,
          })) || []
        }
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
