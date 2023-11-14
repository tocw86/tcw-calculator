/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { FormGroup, ValidationErrors } from '@angular/forms';
import { CalculationsService } from '../services/calculations.service';
import { Inject, InjectionToken, inject } from '@angular/core';
import { CALCULATION_SERVICE_TOKEN } from '../services/calculations.service';

export function ConfirmedValidator(
  vatRate: string,
  net: string,
  vat: string,
  gross: string,
  calculationsService: CalculationsService
) {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const controlNet = formGroup.controls[net];
    const controlVat = formGroup.controls[vat];
    const controlVatRate = formGroup.controls[vatRate];
    const controlGross = formGroup.controls[gross];

    if (controlNet.value && controlVat.value && controlGross.value && controlVatRate.value) {
      const netValue = Number(controlNet.value);
      const vatValue = Number(controlVat.value);
      const vatRateValue = Number(controlVatRate.value);
      const grossValue = Number(controlGross.value);

      if (isNaN(netValue) || isNaN(vatValue) || isNaN(grossValue)) {
        return null; // Do nothing if any of the values are not valid numbers
      }

      if ((vatRateValue / 100) * Number(calculationsService.round(netValue)) === Number(calculationsService.round(vatValue))){
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
