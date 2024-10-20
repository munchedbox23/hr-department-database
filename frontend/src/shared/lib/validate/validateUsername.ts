export const validateUsername = (username: string): string | null => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username)
    ? null
    : "Имя пользователя должно содержать от 3 до 20 символов и может включать буквы, цифры, _ и -";
};
