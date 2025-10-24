import { TestBed } from '@angular/core/testing';

import { AlgorithmusControl } from './algorithmus-control';

describe('AlgorithmusControl', () => {
  let service: AlgorithmusControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmusControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
