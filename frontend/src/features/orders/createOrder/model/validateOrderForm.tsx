function validateContent(content: string): string | null {
  if (!content) {
    return "Содержание не может быть пустым.";
  }
  if (content.length < 6) {
    return "Содержание должно содержать не менее 6 символов.";
  }
  return null;
}

function validateOrderDate(orderDate: string): string | null {
  const currentDate = new Date().toISOString().split("T")[0];
  if (orderDate < currentDate) {
    return "Дата оформления должна быть больше или равна текущей дате.";
  }
  return null;
}

export { validateContent, validateOrderDate };
