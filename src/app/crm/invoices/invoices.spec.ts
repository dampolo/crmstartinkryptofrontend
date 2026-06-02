import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Invoices } from './invoices';
import { provideRouter } from '@angular/router';

describe('Invoices', () => {
  let component: Invoices;
  let fixture: ComponentFixture<Invoices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Invoices],providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Invoices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
