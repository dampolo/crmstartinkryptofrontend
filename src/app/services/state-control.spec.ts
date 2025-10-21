import { TestBed } from '@angular/core/testing';

import { StateControl } from './state-control';

describe('StateControl', () => {
  let service: StateControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
