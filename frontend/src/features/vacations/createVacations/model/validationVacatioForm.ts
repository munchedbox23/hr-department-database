function validateVacationStartDate(startDate: string): string | null {
  if (!startDate) {
    return "Дата отпуска не может быть пустой.";
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

function validatePurpose(purpose: string): string | null {
  if (!purpose) {
    return "Цель не может быть пустой.";
  }
  return null;
}

export { validateVacationStartDate, validateEndDate, validatePurpose };
