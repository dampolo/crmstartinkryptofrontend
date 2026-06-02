import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuth } from './header-auth';
import { provideRouter } from '@angular/router';

describe('HeaderAuth', () => {
  let component: HeaderAuth;
  let fixture: ComponentFixture<HeaderAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAuth],providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAuth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
