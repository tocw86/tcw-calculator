import { IFormCurrency } from './../../forms/currency/currency.component';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const currencyValidator =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const isValidCurrency = control.value in IFormCurrency;
    return isValidCurrency ? null : { invalidCurrency: true };
  };
