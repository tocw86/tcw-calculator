import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Invoice } from 'src/app/core/models/invoice';
import { CalculationsService } from 'src/app/core/services/calculations.service';
import { numbersAndDotValidator } from 'src/app/core/validators/numbers-and-dot-validator';
import { save } from 'src/app/store/total.actions';

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

  constructor(
    private calculationsService: CalculationsService,
    private store: Store,
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

  public calculateTotal(): void {
    const { invoices } = this.form.value;
    const total = this.calculationsService.calculateTotal(invoices);
    this.store.dispatch(save({ data: { total } }));
  }
}
