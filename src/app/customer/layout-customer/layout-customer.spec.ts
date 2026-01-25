import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCustomer } from './layout-customer';

describe('Layout', () => {
  let component: LayoutCustomer;
  let fixture: ComponentFixture<LayoutCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
