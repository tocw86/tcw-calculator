import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
export type ICurrency = 'PLN' | 'USD';
@Component({
  selector: 'tcw-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  @Input() public form!: FormGroup;

  constructor() {}

  public ngOnInit(): void {
    this.form?.addControl(
      'currency',
      new FormControl<ICurrency>('PLN', { nonNullable: true }),
    );
  }
}
