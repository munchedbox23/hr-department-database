import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useState } from "react";
import { Vacation } from "@/entities/vacations/model/types/types";

interface SortVacationProps {
  filteredVacations: Vacation[];
  setFilteredVacations: (vacations: Vacation[]) => void;
}

export const SortVacation = ({
  filteredVacations,
  setFilteredVacations,
}: SortVacationProps) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const sortedVacations = [...filteredVacations].sort((a, b) => {
      const dateA = new Date(a.ДатаОтпуска);
      const dateB = new Date(b.ДатаОтпуска);
      if (value === "startDateAsc") return dateA.getTime() - dateB.getTime();
      if (value === "startDateDesc") return dateB.getTime() - dateA.getTime();
      if (value === "endDateAsc")
        return (
          new Date(a.ДатаОкончания).getTime() -
          new Date(b.ДатаОкончания).getTime()
        );
      if (value === "endDateDesc")
        return (
          new Date(b.ДатаОкончания).getTime() -
          new Date(a.ДатаОкончания).getTime()
        );
      if (value === "daysAsc")
        return (a.КоличествоДней || 0) - (b.КоличествоДней || 0);
      if (value === "daysDesc")
        return (b.КоличествоДней || 0) - (a.КоличествоДней || 0);
      return 0;
    });
    setFilteredVacations(sortedVacations);
  };

  return (
    <CustomSelect
      label="Сортировка"
      name="sort"
      options={[
        {
          value: "startDateAsc",
          label: "Дата начала (по возрастанию)",
        },
        {
          value: "startDateDesc",
          label: "Дата начала (по убыванию)",
        },
        {
          value: "endDateAsc",
          label: "Дата окончания (по возрастанию)",
        },
        {
          value: "endDateDesc",
          label: "Дата окончания (по убыванию)",
        },
        {
          value: "daysAsc",
          label: "Количество дней (по возрастанию)",
        },
        {
          value: "daysDesc",
          label: "Количество дней (по убыванию)",
        },
      ]}
      value={sortOption}
      onChange={(event) => handleSortChange(event.target.value)}
    />
  );
};
