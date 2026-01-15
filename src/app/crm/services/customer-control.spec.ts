import { TestBed } from '@angular/core/testing';

import { CustomerControl } from './customer-control';

describe('CustomerControl', () => {
  let service: CustomerControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
