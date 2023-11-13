import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tcw-homepage',
  template: `<tcw-invoice-contractor></tcw-invoice-contractor>`,
})
export class HomepageComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
