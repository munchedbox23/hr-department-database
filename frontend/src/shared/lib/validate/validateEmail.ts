export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  return emailRegex.test(email)
    ? null
    : "Введите корректный адрес электронной почты.";
};
