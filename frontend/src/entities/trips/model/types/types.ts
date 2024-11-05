export interface ITrip {
  НомерЗаписи: number;
  Страна: string;
  Город: string;
  Организация: string;
  СДата: string;
  ПоДату: string;
  КоличествоДней: number;
  Цель: string;
}

export interface ITripComposition {
  ТабельныйНомер: number;
  НомерЗаписи: number;
}
