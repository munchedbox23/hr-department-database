export interface StaffingRecord {
  НомерЗаписи: number;
  КодДолжности: number;
  КодОтдела: number;
  КоличествоСтавок: number;
  Оклад: number;
}

export interface DepartmentRecord {
  КодОтдела: number;
  ТабельныйНомерРуководителя: number;
  Название: string;
  НомерКабинета: number;
}
