import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdRecoveryCustomer } from './pwd-recovery-customer';

describe('PwdRecoveryCustomer', () => {
  let component: PwdRecoveryCustomer;
  let fixture: ComponentFixture<PwdRecoveryCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PwdRecoveryCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwdRecoveryCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
