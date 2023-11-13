import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Invoice } from 'src/app/core/models/invoice';
import { numbersAndDotValidator } from 'src/app/core/validators/numbers-and-dot-validator';

@Component({
  selector: 'tcw-invoice-contractor',
  templateUrl: './invoice-contractor.component.html',
  styleUrls: ['./invoice-contractor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceContractorComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    invoices: new FormArray([]),
  });

  constructor() {}

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
    return new FormGroup({
      vatRate: new FormControl(null),
      net: new FormControl(0, [numbersAndDotValidator()]),
      vat: new FormControl(0, [numbersAndDotValidator()]),
      gross: new FormControl(0, [numbersAndDotValidator()]),
    });
  }

  public transformToFormGroup(input: AbstractControl): FormGroup {
    return input as FormGroup;
  }

  public removeFromInvoices(index: number): void {
    this.invoices.removeAt(index);
  }
}
