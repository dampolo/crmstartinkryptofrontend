import { TestBed } from '@angular/core/testing';

import { CompanyControl } from './company-control';

describe('CompanyControl', () => {
  let service: CompanyControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
