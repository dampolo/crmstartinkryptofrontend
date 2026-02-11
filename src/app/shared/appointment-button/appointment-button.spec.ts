import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentButton } from './appointment-button';

describe('AppointmentButton', () => {
  let component: AppointmentButton;
  let fixture: ComponentFixture<AppointmentButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
