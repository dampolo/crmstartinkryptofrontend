import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomer } from './user-customer';

describe('Profile', () => {
  let component: UserCustomer;
  let fixture: ComponentFixture<UserCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
