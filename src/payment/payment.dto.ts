export enum PaymentFormat {
  CSV = "csv",
  TEXT = "text",
  JSON = "JSON",
}

export interface PaymentDate {
  baseSalaryDate: string;
  bonusDate: string;
}

export interface PaymentDatesQuery {
  format: string;
}
