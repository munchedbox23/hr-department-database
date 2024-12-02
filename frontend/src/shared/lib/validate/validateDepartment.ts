import { DepartmentRecord } from "@/entities/department/model/types";

export const validateDepartmentName = (
  name: string,
  existingDepartments: DepartmentRecord[]
): string | null => {
  if (!name.trim()) {
    return "Название отдела обязательно";
  }
  if (existingDepartments.some((dept) => dept.Название === name)) {
    return "Отдел с таким названием уже существует";
  }
  return null;
};

export const validateRoomNumber = (
  roomNumber: string | number | undefined,
  existingDepartments: DepartmentRecord[]
): string | null => {
  if (!roomNumber) {
    return "Номер кабинета обязателен";
  }
  const numericRoom = Number(roomNumber);
  if (isNaN(numericRoom) || numericRoom <= 0) {
    return "Введите корректный номер кабинета";
  }
  if (existingDepartments.some((dept) => dept.НомерКабинета === numericRoom)) {
    return "Кабинет с таким номером уже занят";
  }
  return null;
};
