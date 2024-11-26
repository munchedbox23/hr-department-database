import { useModalContext } from "@/app/providers/ModalProvider";
import { ITrip, useAddTripMutation } from "@/entities/trips";
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
} from "../model/validationTripForm";

export const CreateTripForm = ({
  onTripAdded,
}: {
  onTripAdded: () => void;
}) => {
  const { formState, handleChange } = useForm<Omit<ITrip, "НомерЗаписи">>({
    Страна: "Россия",
    Город: "",
    Организация: "",
    СДата: "",
    ПоДату: "",
    КоличествоДней: undefined,
    Цель: "",
  });

  const [addTrip, { isLoading }] = useAddTripMutation();
  const { closeModal } = useModalContext();

  const { errors, validateForm } = useValidation<
    Omit<ITrip, "КоличествоДней" | "НомерЗаписи">
  >({
    Страна: (value) => validateCountry(value as string),
    Город: (value) => validateCity(value as string),
    Организация: (value) => validateOrganization(value as string),
    СДата: (value) => validateStartDate(value as string),
    ПоДату: (value) => validateEndDate(value as string, formState.СДата),
    Цель: (value) => validatePurpose(value as string),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await addTrip({
        ...formState,
        КоличествоДней: Number(formState.КоличествоДней),
      });
      closeModal();
      onTripAdded();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseForm
      isLoading={isLoading}
      onSubmit={handleSubmit}
      buttonText="Создать"
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
        onChange={handleChange}
        fullWidth
        error={!!errors.СДата}
        helperText={errors.СДата}
      />
      <TextField
        type="date"
        name="ПоДату"
        value={formState.ПоДату}
        onChange={handleChange}
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
