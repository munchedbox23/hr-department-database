export const validateName = (name: string): string | null => {
  const nameRegex = /^[a-zA-Zа-яА-Я0-9 _-]{3,30}$/;
  return nameRegex.test(name)
    ? null
    : "Имя должно содержать от 3 до 20 символов и может включать буквы, цифры, пробелы, _ и -";
};
