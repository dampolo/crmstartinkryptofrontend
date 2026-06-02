import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCustomer } from './navbar-customer';
import { provideRouter } from '@angular/router';

describe('NavbarCustomer', () => {
  let component: NavbarCustomer;
  let fixture: ComponentFixture<NavbarCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCustomer],
      providers: [
        provideRouter([])
      ]
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
