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
  if (value === "") {
    return "NULL";
  }
  const currentDate = new Date();
  const inputDate = new Date(value);

  currentDate.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate >= currentDate
    ? null
    : "Дата увольнения должна быть больше или равна текущей даты";
}

function validateFullName(fullName: string): string | null {
  if (!fullName) {
    return "ФИО не может быть пустым.";
  }
  if (fullName.length < 3) {
    return "ФИО должно содержать не менее 3 символов.";
  }
  if (!/^[а-яА-ЯёЁ\s]+$/.test(fullName)) {
    return "ФИО должно содержать только буквы и пробелы.";
  }
  return null;
}

function validateDateOfBirth(dateOfBirth: string): string | null {
  if (!dateOfBirth) {
    return "Дата рождения не может быть пустой.";
  }
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 16 ? null : "Возраст должен быть не менее 16 лет.";
}

export {
  validateAddress,
  validateExperience,
  validateTerminationDate,
  validateFullName,
  validateDateOfBirth,
};
