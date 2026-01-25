import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCustomer } from './navbar-customer';

describe('NavbarCustomer', () => {
  let component: NavbarCustomer;
  let fixture: ComponentFixture<NavbarCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
