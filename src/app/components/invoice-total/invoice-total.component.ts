import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { InvoiceSummary } from 'src/app/core/models/invoice';

@Component({
  selector: 'tcw-invoice-total',
  templateUrl: './invoice-total.component.html',
  styleUrls: ['./invoice-total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceTotalComponent implements OnInit {
  @Input() public total: InvoiceSummary = {
    totalGross: 0,
    totalNet: 0,
    totalVat: 0,
  };
  constructor() {}

  public ngOnInit(): void {}
}
