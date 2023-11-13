import { AbstractControl, ValidatorFn } from '@angular/forms';

export const numbersAndDotValidator =
  (): ValidatorFn =>
  (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = !/^\d*\.?\d*$/.test(control.value);
    return forbidden ? { invalidNumber: { value: control.value } } : null;
  };
