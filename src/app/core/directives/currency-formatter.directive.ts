/* eslint-disable @angular-eslint/directive-selector */
import { CurrencyPipe } from '@angular/common';
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormatter]'
})
export class CurrencyFormatterDirective {

  constructor(private el: ElementRef, private renderer: Renderer2, private currencyPipe: CurrencyPipe) { }

  @HostListener('focus') public onFocus(): void {
    const value = this.el.nativeElement.value;
    this.formatToNumber(value);
  }
  @HostListener('blur') public onBlur(): void {
    const value = this.el.nativeElement.value;
    this.formatCurrency(value);
  }

  private formatCurrency(value: number | string): void {
    if (value) {
      {

        const formattedValue = this.currencyPipe.transform(value, 'PLN', '', '1.2-2');
        this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);

      }
    }
  }

  private formatToNumber(value: string): void {
    if (value) {
      {

        const formattedValue = parseFloat(value.replace(/[^0-9.]+/g, ''));
        this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);

      }
    }
  }
}
