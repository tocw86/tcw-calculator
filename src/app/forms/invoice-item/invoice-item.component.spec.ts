import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceItemComponent } from './invoice-item.component';
import { CurrencyPipe } from '@angular/common';

describe('InvoiceItemComponent', () => {
  let component: InvoiceItemComponent;
  let fixture: ComponentFixture<InvoiceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CurrencyPipe],
      declarations: [InvoiceItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
