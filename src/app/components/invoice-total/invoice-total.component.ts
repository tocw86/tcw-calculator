import { selectInvoiceSummary } from 'src/app/store/total.selector';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InvoiceSummary } from 'src/app/core/models/invoice';
import { TotalState } from 'src/app/store/total.reducer';

@Component({
  selector: 'tcw-invoice-total',
  templateUrl: './invoice-total.component.html',
  styleUrls: ['./invoice-total.component.scss'],
})
export class InvoiceTotalComponent implements OnInit {
  public invoiceSummary$: Observable<InvoiceSummary>;
  constructor(private store: Store<TotalState>) {
    this.invoiceSummary$ = this.store.pipe(select(selectInvoiceSummary));
  }

  public ngOnInit(): void {
    this.invoiceSummary$.subscribe((data) => {
      console.log('Invoice Summary:', data);
    });
  }
}
