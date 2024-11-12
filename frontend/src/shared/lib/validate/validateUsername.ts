export const validateUsername = (username: string): string | null => {
  const usernameRegex = /^[a-zA-Zа-яА-Я0-9 _-]{3,30}$/;
  return usernameRegex.test(username)
    ? null
    : "Имя должно содержать от 3 до 20 символов и может включать буквы, цифры, пробелы, _ и -";
};
