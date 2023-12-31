import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceContractorComponent } from './invoice-contractor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

describe('InvoiceContractorComponent', () => {
  let component: InvoiceContractorComponent;
  let fixture: ComponentFixture<InvoiceContractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [CurrencyPipe],
      declarations: [InvoiceContractorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
