export const validatePhoneNumber = (
  phone: string,
  existingPhones: string[]
): string | null => {
  // Обновленный регулярное выражение для проверки номера телефона
  const phoneRegex = /^8\d{10}$/; // Номер должен начинаться с 8 и содержать 11 цифр
  if (!phoneRegex.test(phone)) {
    return "Введите корректный номер телефона, начинающийся с 8 и состоящий из 11 цифр";
  }
  if (existingPhones.includes(phone)) {
    return "Этот номер телефона уже используется";
  }
  return null;
};
