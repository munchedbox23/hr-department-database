import { TextField } from "@mui/material";
import { useForm } from "@/shared/lib/hooks/useForm";
import { useGetEmployeesQuery } from "@/entities/employee";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { BaseForm } from "@/shared/ui/BaseForm";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import {
  DepartmentRecord,
  useUpdateDepartmentMutation,
} from "@/entities/department";
import {
  validateDepartmentName,
  validateRoomNumber,
} from "../../createDepartment/model/validateDepartmentForm";
import { useValidation } from "@/shared/lib/hooks/useValidate";

export const UpdateDepartmentForm = ({
  department,
  onDepartmentAdded,
}: {
  department: DepartmentRecord;
  onDepartmentAdded: () => void;
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

  const { errors, validateForm } = useValidation<
    Pick<DepartmentRecord, "Название" | "НомерКабинета">
  >({
    Название: (value) => validateDepartmentName(value as string),
    НомерКабинета: (value) =>
      validateRoomNumber(value as string | number | undefined),
  });

  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation();
  const { data: employees = [] } = useGetEmployeesQuery();

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
      });
      onDepartmentAdded();
      closeModal();
    } catch (error) {
      console.log(error);
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
          employees?.map((employee) => ({
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
