import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IFormCurrency } from '../models/currency';

export const currencyValidator =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const isValidCurrency = control.value in IFormCurrency;
    return isValidCurrency ? null : { invalidCurrency: true };
  };
