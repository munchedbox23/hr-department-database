function validateAddress(address: string): string | null {
  if (!address) {
    return "Адрес не может быть пустым.";
  }
  if (address.length < 5) {
    return "Адрес должен содержать не менее 5 символов.";
  }
  return null;
}

function validateExperience(
  experience: string | number | undefined
): string | null {
  if (experience === undefined || experience === "") {
    return null;
  }
  const exp =
    typeof experience === "string" ? parseInt(experience, 10) : experience;
  return Number.isInteger(exp) && exp >= 0
    ? null
    : "Введите корректный опыт работы";
}

function validateTerminationDate(value: string): string | null {
  if (!value) {
    return null;
  }
  const currentDate = new Date();
  const inputDate = new Date(value);
  return inputDate >= currentDate
    ? null
    : "Дата увольнения должна быть >= текущей даты";
}

export { validateAddress, validateExperience, validateTerminationDate };
