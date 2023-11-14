import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IFormCurrency } from 'src/app/core/models/currency';
import { InvoiceSummary } from 'src/app/core/models/invoice';
import { CalculationsService } from 'src/app/core/services/calculations.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ConfirmedValidator } from 'src/app/core/validators/confirmed.validator';
import { currencyValidator } from 'src/app/core/validators/currency-validator';
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

  public form: FormGroup;
  constructor(
    private calculationsService: CalculationsService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private changeDef: ChangeDetectorRef,
  ) {
    this.form = new FormGroup({
      invoices: new FormArray([]),
      total: new FormControl<number>(0, [
        Validators.min(100),
        Validators.max(1500),
      ]),
      nip: new FormControl('', Validators.required),
      currency: new FormControl<IFormCurrency>(IFormCurrency.PLN, {
        nonNullable: true,
        validators: [currencyValidator(), Validators.required],
      }),
    });
  }

  public get invoices(): FormArray {
    return this.form.get('invoices') as FormArray;
  }

  public ngOnInit(): void {}

  public onSubmit(form: FormGroup): void {
    if (!form.invalid) {
      this.form.disable();

      const { value } = this.form;

      this.orderService.store(value).subscribe({
        next: () => {
          alert('OK SUCCESSFUL');
          this.form.enable();
          this.clearForm();
        },
        error: (err: any) => {
          alert('ERROR');
          this.form.enable();
        },
      });
    } else {
      this.changeDef.detectChanges();
      this.form.markAllAsTouched();
      this.form.markAsDirty();
      this.form.updateValueAndValidity();
    }
  }

  public addInvoice(): void {
    const group = this.createInvoiceItemGroup();
    this.invoices.push(group);
    group.updateValueAndValidity();
    this.form.updateValueAndValidity();
  }

  public createInvoiceItemGroup(): FormGroup {
    return this.fb.group(
      {
        vatRate: new FormControl(23),
        net: new FormControl(0, [
          numbersAndDotValidator(),
          Validators.required,
          Validators.min(1),
        ]),
        vat: new FormControl(0, [
          numbersAndDotValidator(),
          Validators.required,
          Validators.min(0),
        ]),
        gross: new FormControl(0, [
          numbersAndDotValidator(),
          Validators.required,
          Validators.min(1),
        ]),
      },
      {
        validator: ConfirmedValidator(
          'vatRate',
          'net',
          'vat',
          'gross',
          this.calculationsService,
        ),
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
    this.form.controls?.total.setValue(this.total.totalNet);
    this.form.controls?.total.markAllAsTouched();
    this.form.controls?.total.updateValueAndValidity();
  }

  public clearForm(): void {
    this.total = {
      totalGross: 0,
      totalNet: 0,
      totalVat: 0,
    };
    this.invoices.clear();
    this.form.reset();
    this.form.clearValidators();
    this.calculateTotal();
    this.form.markAsUntouched();
  }
}
