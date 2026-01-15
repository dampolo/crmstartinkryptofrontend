import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdResetCustomer } from './pwd-reset-customer';

describe('PwdResetCustomer', () => {
  let component: PwdResetCustomer;
  let fixture: ComponentFixture<PwdResetCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PwdResetCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwdResetCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
