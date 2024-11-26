import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect/ui/CustomSelect";
import { TextField } from "@mui/material";
import { useGetEmployeesQuery } from "@/entities/employee";
import { useUpdateOrderMutation } from "@/entities/orders/api/ordersApi";
import { Order } from "@/entities/orders";

type CreateOrderFormState = {
  ТабельныйНомер?: number;
  ДатаОформления: string;
  Содержание: string;
};

export const UpdateOrderForm = ({
  order,
  onOrderAdded,
}: {
  order: Order;
  onOrderAdded: () => void;
}) => {
  const { formState, handleChange } = useForm<CreateOrderFormState>(order);

  const { data: employeesData } = useGetEmployeesQuery();
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateOrder({
        order: {
          ...formState,
          ТабельныйНомер: Number(formState.ТабельныйНомер),
        },
        id: order.НомерПриказа,
      });
      onOrderAdded();
    } catch (error) {
      console.error(error);
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
        options={Array.from({ length: employeesData?.length || 0 }, (_, i) => ({
          value: (i + 1).toString(),
          label: (i + 1).toString(),
        }))}
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
      />
    </BaseForm>
  );
};
