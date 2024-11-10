import { useModalContext } from "@/app/providers/ModalProvider";
import { ITrip, useAddTripMutation } from "@/entities/trips";
import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { TextField } from "@mui/material";

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      />
      <TextField
        type="text"
        label="Город"
        name="Город"
        value={formState.Город}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        type="text"
        label="Организация"
        name="Организация"
        value={formState.Организация}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        type="date"
        name="СДата"
        value={formState.СДата}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        type="date"
        name="ПоДату"
        value={formState.ПоДату}
        onChange={handleChange}
        fullWidth
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
      />
    </BaseForm>
  );
};
