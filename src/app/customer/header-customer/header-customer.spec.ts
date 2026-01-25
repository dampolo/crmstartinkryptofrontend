import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCustomer } from './header-customer';

describe('HeaderCustomer', () => {
  let component: HeaderCustomer;
  let fixture: ComponentFixture<HeaderCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
