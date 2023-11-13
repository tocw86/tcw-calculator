import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VatRate, vatRates } from 'src/app/core/models/vat';

@Component({
  selector: 'tcw-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceItemComponent implements OnInit {
  @Input() public form!: FormGroup;
  public readonly vatRates: VatRate[] = vatRates;

  constructor() {}

  public ngOnInit(): void {}
}
