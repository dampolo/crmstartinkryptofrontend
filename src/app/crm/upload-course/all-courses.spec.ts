import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCourses } from './all-courses';
import { provideRouter, Router } from '@angular/router';
import { MainStateService } from '../../main-services/main-state-service';

describe('AllCourse', () => {
  let component: AllCourses;
  let fixture: ComponentFixture<AllCourses>;

  let mainStateService: MainStateService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCourses],
      providers: [
        provideRouter([]),
        MainStateService,

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
