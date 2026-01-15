import { TestBed } from '@angular/core/testing';

import { ApplicationControl } from './application-control';

describe('ApplicationControl', () => {
  let service: ApplicationControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
