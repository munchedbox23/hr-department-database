export interface Vacation {
  НомерЗаписи: number;
  ТабельныйНомер?: number;
  ВидОтпуска: string;
  ДатаОтпуска: string;
  ДатаОкончания: string;
  КоличествоДней?: number;
  Основание: string;
  Статус: "принято" | "не принято";
}
