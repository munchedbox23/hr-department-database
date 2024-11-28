function validateWorkedHours(hours: string | number | undefined): string | null {
  if (hours === undefined || hours === "") {
    return "Отработанное время не может быть пустым.";
  }
  const hoursValue = typeof hours === "string" ? parseFloat(hours) : hours;
  if (!Number.isFinite(hoursValue) || hoursValue < 0) {
    return "Введите корректное отработанное время.";
  }
  if (hoursValue > 160) {
    return "Отработанное время не может превышать 160 часов.";
  }
  return null;
}

export { validateWorkedHours };
