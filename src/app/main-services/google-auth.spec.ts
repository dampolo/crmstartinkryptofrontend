import { TestBed } from '@angular/core/testing';

import { GoogleAuthService } from './google-auth';

describe('GoogleAuth', () => {
  let service: GoogleAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
