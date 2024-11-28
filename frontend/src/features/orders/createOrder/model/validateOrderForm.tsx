function validateContent(content: string): string | null {
  if (!content) {
    return "Содержание не может быть пустым.";
  }
  if (content.length < 6) {
    return "Содержание должно содержать не менее 6 символов.";
  }
  return null;
}

export { validateContent };
