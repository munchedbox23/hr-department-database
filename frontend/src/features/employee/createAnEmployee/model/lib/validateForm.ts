
export const validateAddress = (address: string): string | null => {
  if (!address) {
    return "Адрес не может быть пустым.";
  }
  if (address.length < 5) {
    return "Адрес должен содержать не менее 5 символов.";
  }
  return null;
};
