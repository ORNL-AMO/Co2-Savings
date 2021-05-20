import { TestBed } from '@angular/core/testing';

import { Co2SavingsService } from './co2-savings.service';

describe('Co2SavingsService', () => {
  let service: Co2SavingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Co2SavingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
