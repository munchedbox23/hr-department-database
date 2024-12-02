import { DepartmentRecord } from "@/entities/staffing/model/types/types";

function validateDepartmentName(
  name: string,
  existingDepartments: DepartmentRecord[]
): string | null {
  if (!name) {
    return "Название отдела не может быть пустым.";
  }
  if (name.length < 3) {
    return "Название отдела должно содержать не менее 3 символов.";
  }
  return null;
}

function validateRoomNumber(
  roomNumber: string | number | undefined
): string | null {
  if (roomNumber === undefined || roomNumber === "") {
    return "Номер кабинета не может быть пустым.";
  }
  const room =
    typeof roomNumber === "string" ? parseInt(roomNumber, 10) : roomNumber;
  return Number.isInteger(room) && room > 0
    ? null
    : "Введите корректный номер кабинета";
}

export { validateDepartmentName, validateRoomNumber };
