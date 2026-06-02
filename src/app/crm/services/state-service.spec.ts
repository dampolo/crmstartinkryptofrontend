import { TestBed } from '@angular/core/testing';
import { stateService } from './state-service';


describe('StateControl', () => {
  let service: stateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(stateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
