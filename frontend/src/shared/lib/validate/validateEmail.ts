export const validateEmail = (
  email: string,
  existingEmails?: string[]
): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    existingEmails &&
    existingEmails.some((existingEmail) => existingEmail === email)
  ) {
    return "Этот адрес электронной почты уже используется";
  }
  return emailRegex.test(email)
    ? null
    : "Введите корректный адрес электронной почты.";
};
