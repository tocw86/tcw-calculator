import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { currencyValidator } from 'src/app/core/validators/currency-validator';
export enum IFormCurrency {
  PLN = 'PLN',
  USD = 'USD',
}
@Component({
  selector: 'tcw-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyComponent implements OnInit {
  @Input() public form!: FormGroup;

  constructor() {}

  public ngOnInit(): void {
    this.form?.addControl(
      'currency',
      new FormControl<IFormCurrency>(IFormCurrency.PLN, {
        nonNullable: true,
        validators: [currencyValidator()],
      }),
    );
  }
}
