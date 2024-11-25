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
  const exp =
    typeof experience === "string" ? parseInt(experience, 10) : experience;
  return exp === undefined || (Number.isInteger(exp) && exp >= 0)
    ? null
    : "Введите корректный опыт работы";
}

export { validateAddress, validateExperience };
