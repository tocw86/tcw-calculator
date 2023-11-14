/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { FormGroup, ValidationErrors } from '@angular/forms';
import { CalculationsService } from '../services/calculations.service';
import { inject } from '@angular/core';

export function ConfirmedValidator(
  vatRate: string,
  net: string,
  vat: string,
  gross: string,
) {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const controlNet = formGroup.controls[net];
    const controlVat = formGroup.controls[vat];
    const controlVatRate = formGroup.controls[vatRate];
    const controlGross = formGroup.controls[gross];

    if (controlNet.value && controlVat.value && controlGross.value) {
      const netValue = parseFloat(controlNet.value);
      const vatValue = parseFloat(controlVat.value);
      const vatRateValue = parseFloat(controlVatRate.value);
      const grossValue = parseFloat(controlGross.value);

      if (isNaN(netValue) || isNaN(vatValue) || isNaN(grossValue)) {
        return null; // Do nothing if any of the values are not valid numbers
      }

      if (netValue * (vatRateValue / 100) === vatValue) {
        controlNet.setErrors(null);
        controlVat.setErrors(null);
        controlGross.setErrors(null);
      } else {
        controlNet.setErrors({ confirmedValidator: true });
        controlVat.setErrors({ confirmedValidator: true });
        controlGross.setErrors({ confirmedValidator: true });
      }
    } else {
      // At least one of the fields is empty, so we clear the errors
      controlNet.setErrors(null);
      controlVat.setErrors(null);
      controlGross.setErrors(null);
    }

    return null;
  };
}
