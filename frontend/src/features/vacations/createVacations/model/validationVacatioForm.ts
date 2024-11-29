function validateVacationStartDate(startDate: string): string | null {
  if (!startDate) {
    return "Дата отпуска не может быть пустой.";
  }
  const start = new Date(startDate);
  const today = new Date();
  if (start <= today) {
    return "Дата отпуска должна быть больше текущей даты.";
  }
  return null;
}

function validateEndDate(endDate: string, startDate: string): string | null {
  if (!endDate) {
    return "Дата окончания не может быть пустой.";
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end < start) {
    return "Дата окончания должна быть больше или равна дате отпуска.";
  }
  return null;
}

function validateNumberOfDays(
  startDate: string,
  endDate: string,
  numberOfDays: number
): string | null {
  if (!startDate || !endDate) {
    return "Дата отпуска и дата окончания должны быть заполнены.";
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  const calculatedDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (calculatedDays !== numberOfDays) {
    return `Количество дней должно быть равно ${calculatedDays}.`;
  }
  return null;
}

function validatePurpose(purpose: string): string | null {
  if (!purpose) {
    return "Основание не может быть пустой.";
  }
  return null;
}

const calculateDaysBetweenDates = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export {
  validateVacationStartDate,
  validateEndDate,
  validatePurpose,
  validateNumberOfDays,
  calculateDaysBetweenDates,
};
