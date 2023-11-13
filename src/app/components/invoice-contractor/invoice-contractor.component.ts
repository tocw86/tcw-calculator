import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tcw-invoice-contractor',
  templateUrl: './invoice-contractor.component.html',
  styleUrls: ['./invoice-contractor.component.scss'],
})
export class InvoiceContractorComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  constructor() {}

  public ngOnInit(): void {}

  public onSubmit(form: FormGroup): void {
    if (!form.invalid) {
    }
  }
}
