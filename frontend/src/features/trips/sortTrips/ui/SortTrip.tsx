import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useState } from "react";
import { ITrip } from "@/entities/trips";

interface SortTripProps {
  filteredTrips: ITrip[];
  setFilteredTrips: (trips: ITrip[]) => void;
}

export const SortTrip = ({
  filteredTrips,
  setFilteredTrips,
}: SortTripProps) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const sortedTrips = [...filteredTrips].sort((a, b) => {
      const dateA = new Date(a.СДата);
      const dateB = new Date(b.СДата);
      if (value === "startDateAsc") return dateA.getTime() - dateB.getTime();
      if (value === "startDateDesc") return dateB.getTime() - dateA.getTime();
      if (value === "endDateAsc")
        return new Date(a.ПоДату).getTime() - new Date(b.ПоДату).getTime();
      if (value === "endDateDesc")
        return new Date(b.ПоДату).getTime() - new Date(a.ПоДату).getTime();
      return 0;
    });
    setFilteredTrips(sortedTrips);
  };

  return (
    <CustomSelect
      label="Сортировка"
      name="sort"
      options={[
        { value: "startDateAsc", label: "Дата начала (по возрастанию)" },
        { value: "startDateDesc", label: "Дата начала (по убыванию)" },
        { value: "endDateAsc", label: "Дата окончания (по возрастанию)" },
        { value: "endDateDesc", label: "Дата окончания (по убыванию)" },
      ]}
      value={sortOption}
      onChange={(event) => handleSortChange(event.target.value)}
    />
  );
};
