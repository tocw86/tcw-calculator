export interface Invoice {
  vatRate: number;
  net: number;
  vat: number;
  gross: number;
}

export interface InvoiceSummary {
  totalNet: number;
  totalVat: number;
  totalGross: number;
}
