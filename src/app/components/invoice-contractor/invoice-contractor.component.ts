import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { InvoiceSummary } from 'src/app/core/models/invoice';
import { CalculationsService } from 'src/app/core/services/calculations.service';
import { ConfirmedValidator } from 'src/app/core/validators/confirmed.validator';
import { numbersAndDotValidator } from 'src/app/core/validators/numbers-and-dot-validator';

@Component({
  selector: 'tcw-invoice-contractor',
  templateUrl: './invoice-contractor.component.html',
  styleUrls: ['./invoice-contractor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceContractorComponent implements OnInit {
  public total: InvoiceSummary = {
    totalGross: 0,
    totalNet: 0,
    totalVat: 0,
  };

  public form: FormGroup = new FormGroup({
    invoices: new FormArray([]),
  });

  constructor(
    private calculationsService: CalculationsService,
    private fb: FormBuilder,
  ) {}

  public get invoices(): FormArray {
    return this.form.get('invoices') as FormArray;
  }

  public ngOnInit(): void {}

  public onSubmit(form: FormGroup): void {
    if (!form.invalid) {
    }
  }

  public addInvoice(): void {
    this.invoices.push(this.createInvoiceItemGroup());
  }

  public createInvoiceItemGroup(): FormGroup {
    return this.fb.group(
      {
        vatRate: new FormControl(23),
        net: new FormControl(0, [numbersAndDotValidator()]),
        vat: new FormControl(0, [numbersAndDotValidator()]),
        gross: new FormControl(0, [numbersAndDotValidator()]),
      },
      {
        validator: ConfirmedValidator('vatRate', 'net', 'vat', 'gross', this.calculationsService),
      },
    );
  }

  public transformToFormGroup(input: AbstractControl): FormGroup {
    return input as FormGroup;
  }

  public removeFromInvoices(index: number): void {
    this.invoices.removeAt(index);
  }

  public calculateTotal(): void {
    const { invoices } = this.form.value;
    this.total = this.calculationsService.calculateTotal(invoices);
  }
}
