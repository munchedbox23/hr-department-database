export const validatePassword = (password: string): string | null => {
  const isValid =
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  return isValid
    ? null
    : "Пароль должен содержать минимум 8 символов, одну заглавную букву и одну цифру";
};
