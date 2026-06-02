import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetails } from './customer-details';
import { ActivatedRoute } from '@angular/router';

describe('CustomerDetails', () => {
  let component: CustomerDetails;
  let fixture: ComponentFixture<CustomerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetails, ActivatedRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
