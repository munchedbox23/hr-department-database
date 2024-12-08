import { BaseForm } from "@/shared/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useForm } from "@/shared/lib/hooks/useForm";
import {
  StaffingRecord,
  useAddStaffingMutation,
  useGetDepartmentQuery,
} from "@/entities/staffing";
import { EmployeePosition } from "@/entities/employee";
import { TextField } from "@mui/material";
import { useModalContext } from "@/app/providers/ModalProvider";
import { validateSalary } from "../model/validateStaffingForm";
import { useValidation } from "@/shared/lib/hooks/useValidate";

export const CreateStaffingForm = ({
  positions,
  onStaffingAdded,
  onStaffingAddedError,
}: {
  positions: EmployeePosition[];
  onStaffingAdded: () => void;
  onStaffingAddedError: () => void;
}) => {
  const { closeModal } = useModalContext();
  const { formState, handleChange } = useForm<
    Omit<Partial<StaffingRecord>, "НомерЗаписи">
  >({
    КодДолжности: undefined,
    КодОтдела: undefined,
    КоличествоСтавок: 1,
    Оклад: undefined,
  });

  const { errors, validateForm } = useValidation<
    Pick<Partial<StaffingRecord>, "Оклад">
  >({
    Оклад: (value) => validateSalary(value as string | number | undefined),
  });

  const { data: departments = [] } = useGetDepartmentQuery();
  const [addStaffing, { isLoading: isAddingStaffing }] =
    useAddStaffingMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm(formState)) return;
    try {
      const staffingData = {
        ...formState,
        Оклад: Number(formState.Оклад),
        КоличествоСтавок: Number(formState.КоличествоСтавок),
      };
      await addStaffing(
        staffingData as Omit<StaffingRecord, "НомерЗаписи">
      ).unwrap();
      onStaffingAdded();
    } catch (error) {
      onStaffingAddedError();
    } finally {
      closeModal();
    }
  };

  return (
    <BaseForm
      isLoading={isAddingStaffing}
      onSubmit={handleSubmit}
      buttonText="Добавить"
    >
      <CustomSelect
        label="Должность"
        name="КодДолжности"
        value={formState?.КодДолжности?.toString() ?? ""}
        options={positions?.map((position) => ({
          value: position.Название.toString(),
          label: position.Название,
        }))}
        onChange={handleChange}
      />
      <CustomSelect
        label="Отдел"
        name="КодОтдела"
        value={formState?.КодОтдела?.toString() ?? ""}
        options={departments?.map((department) => ({
          value: department.Название.toString(),
          label: department.Название,
        }))}
        onChange={handleChange}
      />
      <TextField
        type="number"
        name="КоличествоСтавок"
        label="Количество Ставок"
        value={Number(formState.КоличествоСтавок) || 1}
        variant="outlined"
        onChange={handleChange}
        inputProps={{ min: 1, max: 5 }}
        fullWidth
      />
      <TextField
        type="number"
        name="Оклад"
        label="Оклад"
        value={Number(formState.Оклад) || ""}
        variant="outlined"
        onChange={handleChange}
        inputProps={{ min: 1, max: 100000000 }}
        fullWidth
        error={!!errors.Оклад}
        helperText={errors.Оклад}
      />
    </BaseForm>
  );
};
