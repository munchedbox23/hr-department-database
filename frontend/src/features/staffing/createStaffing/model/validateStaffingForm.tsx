function validateSalary(salary: string | number | undefined): string | null {
  if (salary === undefined || salary === "") {
    return "Оклад не может быть пустым.";
  }
  const salaryValue = typeof salary === "string" ? parseFloat(salary) : salary;
  if (!Number.isFinite(salaryValue) || salaryValue <= 0) {
    return "Введите корректный оклад.";
  }
  if (salaryValue > 100000000) {
    return "Оклад не может превышать 100,000,000.";
  }
  return null;
}

export { validateSalary };
