import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'tcw-homepage',
  template: `<tcw-invoice-contractor></tcw-invoice-contractor>`,
})
export class HomepageComponent implements OnInit {
  constructor() {}
  public ngOnInit(): void {}
}
