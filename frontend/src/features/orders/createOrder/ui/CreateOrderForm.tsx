import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect/ui/CustomSelect";
import { TextField } from "@mui/material";
import { useGetEmployeesQuery } from "@/entities/employee";
import { useAddOrderMutation } from "@/entities/orders/api/ordersApi";
import { useModalContext } from "@/app/providers/ModalProvider";
import { validateContent, validateOrderDate } from "../model/validateOrderForm";
import { useValidation } from "@/shared/lib/hooks/useValidate";

type CreateOrderFormState = {
  ТабельныйНомер?: number;
  ДатаОформления: string;
  Содержание: string;
};

export const CreateOrderForm = ({
  onOrderAdded,
  onOrderAddedError,
}: {
  onOrderAdded: () => void;
  onOrderAddedError: () => void;
}) => {
  const { formState, handleChange } = useForm<CreateOrderFormState>({
    ТабельныйНомер: undefined,
    ДатаОформления: new Date().toISOString().split("T")[0],
    Содержание: "",
  });

  const { data: employeesData } = useGetEmployeesQuery();
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const { closeModal } = useModalContext();

  const { errors, validateForm } = useValidation<
    Pick<CreateOrderFormState, "Содержание" | "ДатаОформления">
  >({
    Содержание: (value) => validateContent(value as string),
    ДатаОформления: (value) => validateOrderDate(value as string),
  });

  const filteredEmployees = employeesData?.filter(
    (employee) => employee.ДатаУвольнения === "NULL"
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm(formState)) return;

    try {
      await addOrder({
        ...formState,
        ТабельныйНомер: Number(formState.ТабельныйНомер),
      }).unwrap();
      onOrderAdded();
    } catch (error) {
      onOrderAddedError();
    } finally {
      closeModal();
    }
  };

  return (
    <BaseForm
      buttonText="Добавить"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <CustomSelect
        name="ТабельныйНомер"
        label="Табельный номер"
        options={
          filteredEmployees?.map((employee) => ({
            value: employee.ТабельныйНомер.toString(),
            label: employee.ТабельныйНомер.toString() + " - " + employee.ФИО,
          })) || []
        }
        value={formState.ТабельныйНомер?.toString() || ""}
        onChange={handleChange}
      />
      <TextField
        type="date"
        name="ДатаОформления"
        label="Дата оформления"
        value={formState.ДатаОформления}
        variant="outlined"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        error={!!errors.ДатаОформления}
        helperText={errors.ДатаОформления}
      />
      <TextField
        name="Содержание"
        label="Содержание"
        value={formState.Содержание}
        variant="outlined"
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        error={!!errors.Содержание}
        helperText={errors.Содержание}
      />
    </BaseForm>
  );
};
