import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Information } from './information';
import { provideRouter } from '@angular/router';

describe('Information', () => {
  let component: Information;
  let fixture: ComponentFixture<Information>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Information],providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Information);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
