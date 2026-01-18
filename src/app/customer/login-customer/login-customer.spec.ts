import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCustomer } from './login-customer';

describe('Login', () => {
  let component: LoginCustomer;
  let fixture: ComponentFixture<LoginCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
