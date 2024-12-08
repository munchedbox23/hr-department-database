import { ITrip, useUpdateTripMutation } from "@/entities/trips";
import { useForm } from "@/shared/lib/hooks/useForm";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import { BaseForm } from "@/shared/ui/BaseForm";
import { TextField } from "@mui/material";
import {
  validateCountry,
  validateCity,
  validateOrganization,
  validateStartDate,
  validatePurpose,
  validateEndDate,
  validateNumberOfDays,
} from "../../createTrip/model/validationTripForm";
import { calculateDaysBetweenDates } from "@/features/vacations/createVacations/model/validationVacatioForm";

export const UpdateTripForm = ({
  trip,
  onTripUpdated,
  onTripUpdatedError,
}: {
  trip: ITrip;
  onTripUpdated: () => void;
  onTripUpdatedError: () => void;
}) => {
  const { formState, handleChange, setFormState } = useForm<
    Omit<ITrip, "НомерЗаписи">
  >({
    Страна: trip.Страна,
    Город: trip.Город,
    Организация: trip.Организация,
    СДата: trip.СДата,
    ПоДату: trip.ПоДату,
    КоличествоДней: trip.КоличествоДней || undefined,
    Цель: trip.Цель,
  });

  const [updateTrip, { isLoading }] = useUpdateTripMutation();

  const { errors, validateForm } = useValidation<Omit<ITrip, "НомерЗаписи">>({
    Страна: (value) => validateCountry(value as string),
    Город: (value) => validateCity(value as string),
    Организация: (value) => validateOrganization(value as string),
    СДата: (value) => validateStartDate(value as string),
    ПоДату: (value) => validateEndDate(value as string, formState.СДата),
    Цель: (value) => validatePurpose(value as string),
    КоличествоДней: (value) =>
      validateNumberOfDays(formState.СДата, formState.ПоДату, Number(value)),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await updateTrip({
        trip: {
          ...formState,
          КоличествоДней: Number(formState.КоличествоДней),
        },
        id: trip.НомерЗаписи,
      }).unwrap();
      onTripUpdated();
    } catch (error) {
      onTripUpdatedError();
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    const { name, value } = event.target;
    if (name === "СДата" || name === "ПоДату") {
      const { СДата, ПоДату } = formState;
      const startDate = name === "СДата" ? value : СДата;
      const endDate = name === "ПоДату" ? value : ПоДату;
      if (startDate && endDate) {
        const days = calculateDaysBetweenDates(startDate, endDate);
        setFormState((prevState) => ({
          ...prevState,
          КоличествоДней: days,
        }));
      }
    }
  };

  return (
    <BaseForm
      isLoading={isLoading}
      onSubmit={handleSubmit}
      buttonText="Изменить"
    >
      <TextField
        type="text"
        label="Страна"
        name="Страна"
        value={formState.Страна}
        onChange={handleChange}
        fullWidth
        error={!!errors.Страна}
        helperText={errors.Страна}
      />
      <TextField
        type="text"
        label="Город"
        name="Город"
        value={formState.Город}
        onChange={handleChange}
        fullWidth
        error={!!errors.Город}
        helperText={errors.Город}
      />
      <TextField
        type="text"
        label="Организация"
        name="Организация"
        value={formState.Организация}
        onChange={handleChange}
        fullWidth
        error={!!errors.Организация}
        helperText={errors.Организация}
      />
      <TextField
        type="date"
        name="СДата"
        value={formState.СДата}
        onChange={handleDateChange}
        fullWidth
        error={!!errors.СДата}
        helperText={errors.СДата}
      />
      <TextField
        type="date"
        name="ПоДату"
        value={formState.ПоДату}
        onChange={handleDateChange}
        fullWidth
        error={!!errors.ПоДату}
        helperText={errors.ПоДату}
      />
      <TextField
        type="number"
        label="Количество дней"
        name="КоличествоДней"
        value={formState.КоличествоДней || ""}
        onChange={handleChange}
        InputProps={{ inputProps: { min: 0 } }}
        fullWidth
        error={!!errors.КоличествоДней}
        helperText={errors.КоличествоДней}
      />
      <TextField
        type="text"
        label="Цель"
        name="Цель"
        value={formState.Цель}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
        error={!!errors.Цель}
        helperText={errors.Цель}
      />
    </BaseForm>
  );
};