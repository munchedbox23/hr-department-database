import { BaseForm } from "@/shared/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { TextField } from "@mui/material";
import { useForm } from "@/shared/lib/hooks/useForm";
import { TimeSheetRecord } from "@/entities/time-sheet/model/types/types";
import { useGetEmployeesQuery } from "@/entities/employee";
import { useAddTimeSheetMutation } from "@/entities/time-sheet";
import { useModalContext } from "@/app/providers/ModalProvider";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import { validateWorkedHours } from "../model/validateTimeSheetForm";

export const CreateTimeSheetForm = ({
  onTimeSheetAdded,
  onTimeSheetAddedError,
}: {
  onTimeSheetAdded: () => void;
  onTimeSheetAddedError: () => void;
}) => {
  const { formState, handleChange } = useForm<Partial<TimeSheetRecord>>({
    ТабельныйНомер: undefined,
    ОтработанноеВремя: 0,
    Месяц: undefined,
  });

  const { closeModal } = useModalContext();

  const { data: employeesData } = useGetEmployeesQuery();
  const [addTimeSheet, { isLoading }] = useAddTimeSheetMutation();

  const { errors, validateForm } = useValidation<
    Pick<TimeSheetRecord, "ОтработанноеВремя">
  >({
    ОтработанноеВремя: (value) => validateWorkedHours(value as string | number),
  });

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
    const formStateWithDefaults = {
      ...formState,
      ОтработанноеВремя: formState.ОтработанноеВремя ?? 0,
    };
    if (!validateForm(formStateWithDefaults)) return;
    try {
      await addTimeSheet({
        ...formStateWithDefaults,
        ТабельныйНомер: Number(formStateWithDefaults.ТабельныйНомер),
        ОтработанноеВремя: Number(formStateWithDefaults.ОтработанноеВремя),
      } as Omit<TimeSheetRecord, "НомерЗаписи">).unwrap();
      onTimeSheetAdded();
    } catch (error) {
      onTimeSheetAddedError();
    } finally {
      closeModal();
    }
  };

  return (
    <BaseForm
      isLoading={isLoading}
      onSubmit={handleSubmit}
      buttonText="Добавить"
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
        inputProps={{ min: 0, max: 170 }}
        fullWidth
        error={!!errors.ОтработанноеВремя}
        helperText={errors.ОтработанноеВремя}
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
