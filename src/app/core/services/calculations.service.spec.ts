import { TestBed } from '@angular/core/testing';

import { CalculationsService } from './calculations.service';
import { CurrencyPipe } from '@angular/common';

describe('CalculationsService', () => {
  let service: CalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyPipe],
    });
    service = TestBed.inject(CalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
