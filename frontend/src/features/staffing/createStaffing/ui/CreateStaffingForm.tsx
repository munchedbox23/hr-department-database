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

export const CreateStaffingForm = ({
  positions,
  onStaffingAdded,
}: {
  positions: EmployeePosition[];
  onStaffingAdded: () => void;
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

  const { data: departments = [] } = useGetDepartmentQuery();
  const [addStaffing, { isLoading: isAddingStaffing }] =
    useAddStaffingMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const staffingData = {
        ...formState,
        Оклад: Number(formState.Оклад),
      };
      await addStaffing(staffingData as Omit<StaffingRecord, "НомерЗаписи">);
      closeModal();
      onStaffingAdded();
    } catch (error) {
      console.error("Error adding staffing:", error);
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
        inputProps={{ min: 1, max: 10 }}
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
      />
    </BaseForm>
  );
};
