/* eslint-disable @angular-eslint/directive-selector */
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { CalculationsService } from '../services/calculations.service';

@Directive({
  selector: '[appCurrencyFormatter]',
})
export class CurrencyFormatterDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private calculations: CalculationsService,
  ) {}

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
        const formattedValue = this.calculations.formatCurrency(value);
        this.renderer.setProperty(
          this.el.nativeElement,
          'value',
          formattedValue,
        );
      }
    }
  }

  private formatToNumber(value: string): void {
    if (value) {
      {
        const formattedValue = parseFloat(value.replace(/[^0-9.]+/g, ''));
        this.renderer.setProperty(
          this.el.nativeElement,
          'value',
          formattedValue,
        );
      }
    }
  }
}
