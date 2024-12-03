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

function validateManagerNumber(
  managerNumber: string | undefined,
  employees: { ТабельныйНомер: number; ДатаУвольнения?: string }[]
): string | null {
  if (!managerNumber) {
    return "Табельный номер руководителя не может быть пустым.";
  }
  const manager = employees.find(
    (employee) => employee.ТабельныйНомер.toString() === managerNumber
  );
  if (manager && manager.ДатаУвольнения) {
    return "Руководитель не может быть уволенным.";
  }
  return null;
}

export { validateDepartmentName, validateRoomNumber, validateManagerNumber };
