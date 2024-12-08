export type Employee = {
  ТабельныйНомер: number;
  ФИО: string;
  Пол: "м" | "ж";
  КодДолжности: number | string;
  Стаж?: string | number | null;
  Телефон: string;
  Прописка: string;
  Образование:
    | "среднее"
    | "высшее"
    | "неоконченное высшее"
    | "среднее специальное"
    | "профессиональное"
    | "";
  ДатаПриема: string;
  Почта: string;
  СемейноеПоложение:
    | "холост"
    | "женат"
    | "замужем"
    | "разведена"
    | "разведен"
    | "вдовец"
    | "вдова"
    | "";
  ДатаУвольнения?: string;
  ДатаРождения: string;
  КодОтдела: string;
};

export type EmployeePosition = {
  КодДолжности: number;
  Название: string;
};

export type FreeEmployeePosition = {
  КодДолжности: string;
  КодОтдела: string;
  СвободныеВакансии: number;
};
