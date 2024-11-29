import { BaseForm } from "@/shared/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { TextField } from "@mui/material";
import { useForm } from "@/shared/lib/hooks/useForm";
import { useGetEmployeesQuery } from "@/entities/employee";
import {
  useUpdateTimeSheetMutation,
  TimeSheetRecord,
} from "@/entities/time-sheet";

export const UpdateTimeSheetForm = ({
  timeSheet,
  onTimeSheetUpdated,
}: {
  timeSheet: TimeSheetRecord;
  onTimeSheetUpdated: () => void;
}) => {
  const { formState, handleChange } = useForm<Partial<TimeSheetRecord>>({
    ТабельныйНомер: timeSheet.ТабельныйНомер || undefined,
    ОтработанноеВремя: timeSheet.ОтработанноеВремя || undefined,
    Месяц: timeSheet.Месяц || undefined,
  });

  const { data: employeesData } = useGetEmployeesQuery();
  const [updateTimeSheet, { isLoading }] = useUpdateTimeSheetMutation();

  const monthNames = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateTimeSheet({
        timeSheet: {
          ...formState,
          ТабельныйНомер: Number(formState.ТабельныйНомер),
          ОтработанноеВремя: Number(formState.ОтработанноеВремя),
        } as Omit<TimeSheetRecord, "НомерЗаписи">,
        id: timeSheet.НомерЗаписи,
      });

      onTimeSheetUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseForm
      isLoading={isLoading}
      onSubmit={handleSubmit}
      buttonText="Изменить"
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
      <TextField
        type="number"
        name="ОтработанноеВремя"
        label="Отработанное время"
        value={Number(formState.ОтработанноеВремя) || ""}
        onChange={handleChange}
        inputProps={{ min: 0, max: 160 }}
        fullWidth
        required
      />
      <CustomSelect
        name="Месяц"
        label="Месяц"
        options={monthNames.map((month) => ({
          value: month,
          label: month.charAt(0).toUpperCase() + month.slice(1),
        }))}
        value={formState.Месяц || ""}
        onChange={handleChange}
      />
    </BaseForm>
  );
};
