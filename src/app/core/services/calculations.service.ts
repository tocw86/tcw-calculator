import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculationsService {
  constructor(private currencyPipe: CurrencyPipe) {}

  public calculateNet(net: number, vat: number): number {
    return this.round(this.sanitizeNumber(net) * (1 + Number(vat / 100))) ?? 0;
  }

  public caluculateGross(net: number, vat: number): number {
    return this.round(Number(this.sanitizeNumber(net)) + Number(vat));
  }

  public caluculateVat(net: number, vat: number): number {
    return this.round(this.sanitizeNumber(net) * (vat / 100));
  }

  public formatCurrency(value: number | string): string | null | number {
    if (value) {
      return this.currencyPipe.transform(value, 'PLN', '', '1.2-2');
    } else {
      return value;
    }
  }

  public round(value: number | string): number {
    return Math.round(Number(this.sanitizeNumber(value)) * 10) / 10;
  }
  public sanitizeNumber(value: string | number): number {
    const val = value.toString();
    return parseFloat(val.replace(/[^0-9.]+/g, ''));
  }
}
