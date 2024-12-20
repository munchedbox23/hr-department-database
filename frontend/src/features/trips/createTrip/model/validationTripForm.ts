function validateCountry(country: string): string | null {
  if (!country) {
    return "Страна не может быть пустой.";
  }
  return null;
}

function validateCity(city: string): string | null {
  if (!city) {
    return "Город не может быть пустым.";
  }
  return null;
}

function validateOrganization(organization: string): string | null {
  if (!organization) {
    return "Организация не может быть пустой.";
  }
  return null;
}

function validatePositionCode(positionCode: string): string | null {
  return positionCode ? null : "Должность должна быть выбрана.";
}

function validateStartDate(startDate: string): string | null {
  if (!startDate) {
    return "Дата начала не может быть пустой.";
  }
  const start = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (start < today) {
    return "Дата начала должна быть больше или равна текущей дате.";
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
    return "Дата окончания должна быть больше или равна дате начала.";
  }
  return null;
}

function validatePurpose(purpose: string): string | null {
  if (!purpose) {
    return "Цель не может быть пустой.";
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

export {
  validateEndDate,
  validatePurpose,
  validateCountry,
  validateCity,
  validateOrganization,
  validateStartDate,
  validateNumberOfDays,
  validatePositionCode,
};
