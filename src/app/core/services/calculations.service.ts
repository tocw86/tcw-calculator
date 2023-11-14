import { CurrencyPipe } from '@angular/common';
import { Injectable, InjectionToken } from '@angular/core';
import { Invoice, InvoiceSummary } from '../models/invoice';
export const CALCULATION_SERVICE_TOKEN =
  new InjectionToken<CalculationsService>('CalculationsService');

@Injectable({
  providedIn: 'root',
})
export class CalculationsService {
  constructor(private currencyPipe: CurrencyPipe) {}

  public calculateTotal(invoices: Invoice[]): InvoiceSummary {
    return invoices.reduce<InvoiceSummary>(
      (acc, invoice) => ({
        totalNet: Number(
          this.round(Number(acc.totalNet) + Number(invoice.net)),
        ),
        totalVat: Number(
          this.round(Number(acc.totalVat) + Number(invoice.vat)),
        ),
        totalGross: Number(
          this.round(Number(acc.totalGross) + Number(invoice.gross)),
        ),
      }),
      { totalNet: 0, totalVat: 0, totalGross: 0 },
    );
  }

  public calculateNet(net: number, vat: number): number {
    return (
      Number(this.round(this.sanitizeNumber(net) * (1 + Number(vat / 100)))) ??
      0
    );
  }

  public caluculateGross(net: number, vat: number): number {
    return Number(this.round(Number(this.sanitizeNumber(net)) + Number(vat)));
  }

  public caluculateVat(net: number, vat: number): number {
    return Number(this.round(this.sanitizeNumber(net) * (vat / 100)));
  }

  public formatCurrency(value: number | string): string | null | number {
    if (value) {
      return this.currencyPipe.transform(value, 'PLN', '', '1.2-2');
    } else {
      return value;
    }
  }

  public round(value: number | string): string {
    return Number(this.sanitizeNumber(value)).toFixed(2);
  }
  public sanitizeNumber(value: string | number): number {
    const val = value.toString();
    return parseFloat(val.replace(/[^0-9.]+/g, ''));
  }
}
