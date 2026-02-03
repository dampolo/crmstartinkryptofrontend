import { TestBed } from '@angular/core/testing';

import { MainStateService } from './main-state-service';

describe('MainStateControl', () => {
  let service: MainStateService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
