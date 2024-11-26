import { BaseForm } from "@/shared/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useForm } from "@/shared/lib/hooks/useForm";
import {
  StaffingRecord,
  useUpdateStaffingMutation,
  useGetDepartmentQuery,
} from "@/entities/staffing";
import { EmployeePosition } from "@/entities/employee";
import { TextField } from "@mui/material";

export const UpdateStaffingForm = ({
  staffing,
  positions,
  onStaffingAdded,
}: {
  staffing: StaffingRecord;
  positions: EmployeePosition[];
  onStaffingAdded: () => void;
}) => {
  const { formState, handleChange } =
    useForm<Omit<Partial<StaffingRecord>, "НомерЗаписи">>(staffing);

  const { data: departments = [] } = useGetDepartmentQuery();
  const [updateStaffing, { isLoading: isUpdatingStaffing }] =
    useUpdateStaffingMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const staffingData = {
        ...formState,
        Оклад: Number(formState.Оклад),
        КоличествоСтавок: Number(formState.КоличествоСтавок),
      };
      await updateStaffing({
        staffing: staffingData as Omit<StaffingRecord, "НомерЗаписи">,
        id: staffing.НомерЗаписи,
      });
      onStaffingAdded();
    } catch (error) {
      console.error("Error adding staffing:", error);
    }
  };

  return (
    <BaseForm
      isLoading={isUpdatingStaffing}
      onSubmit={handleSubmit}
      buttonText="Добавить"
    >
      <CustomSelect
        label="Должность"
        name="КодДолжности"
        value={formState?.КодДолжности?.toString() || ""}
        options={positions?.map((position) => ({
          value: position.Название.toString(),
          label: position.Название,
        }))}
        onChange={handleChange}
      />
      <CustomSelect
        label="Отдел"
        name="КодОтдела"
        value={formState?.КодОтдела?.toString() || ""}
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
