import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useState } from "react";
import { Order } from "@/entities/orders";

interface SortOrderProps {
  filteredOrders: Order[];
  setFilteredOrders: (orders: Order[]) => void;
}

export const SortOrder = ({
  filteredOrders,
  setFilteredOrders,
}: SortOrderProps) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (value === "dateAsc")
        return (
          new Date(a.ДатаОформления).getTime() -
          new Date(b.ДатаОформления).getTime()
        );
      if (value === "dateDesc")
        return (
          new Date(b.ДатаОформления).getTime() -
          new Date(a.ДатаОформления).getTime()
        );
      if (value === "numberAsc")
        return Number(a.ТабельныйНомер) - Number(b.ТабельныйНомер);
      if (value === "numberDesc")
        return Number(b.ТабельныйНомер) - Number(a.ТабельныйНомер);
      return 0;
    });
    setFilteredOrders(sortedOrders);
  };

  return (
    <CustomSelect
      label="Сортировка"
      name="sort"
      options={[
        { value: "dateAsc", label: "Дата оформления (по возрастанию)" },
        { value: "dateDesc", label: "Дата оформления (по убыванию)" },
        { value: "numberAsc", label: "Табельный номер (по возрастанию)" },
        { value: "numberDesc", label: "Табельный номер (по убыванию)" },
      ]}
      value={sortOption}
      onChange={(event) => handleSortChange(event.target.value)}
    />
  );
};
