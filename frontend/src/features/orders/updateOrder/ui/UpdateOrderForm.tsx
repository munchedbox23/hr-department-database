import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect/ui/CustomSelect";
import { TextField } from "@mui/material";
import { useGetEmployeesQuery } from "@/entities/employee";
import { useUpdateOrderMutation } from "@/entities/orders/api/ordersApi";
import { Order } from "@/entities/orders";
import {
  validateContent,
  validateOrderDate,
} from "../../createOrder/model/validateOrderForm";
import { useValidation } from "@/shared/lib/hooks/useValidate";

type CreateOrderFormState = {
  ТабельныйНомер?: number;
  ДатаОформления: string;
  Содержание: string;
};

export const UpdateOrderForm = ({
  order,
  onOrderUpdated,
  onOrderUpdatedError,
}: {
  order: Order;
  onOrderUpdated: () => void;
  onOrderUpdatedError: () => void;
}) => {
  const { formState, handleChange } = useForm<CreateOrderFormState>(order);

  const { data: employeesData } = useGetEmployeesQuery();
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const { errors, validateForm } = useValidation<
    Pick<CreateOrderFormState, "Содержание" | "ДатаОформления">
  >({
    Содержание: (value: string) => validateContent(value),
    ДатаОформления: (value: string) => validateOrderDate(value),
  });

  const filteredEmployees = employeesData?.filter(
    (employee) => employee.ДатаУвольнения === "NULL"
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await updateOrder({
        order: {
          ...formState,
          ТабельныйНомер: Number(formState.ТабельныйНомер),
        },
        id: order.НомерПриказа,
      }).unwrap();
      onOrderUpdated();
    } catch (error) {
      onOrderUpdatedError();
    }
  };

  return (
    <BaseForm
      buttonText="Изменить"
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
