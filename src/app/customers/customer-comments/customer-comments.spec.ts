import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComments } from './customer-comments';

describe('CustomerComments', () => {
  let component: CustomerComments;
  let fixture: ComponentFixture<CustomerComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerComments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
