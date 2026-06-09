import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCourses } from './all-courses';
import { provideRouter, Router } from '@angular/router';
import { MainStateService } from '../../main-services/main-state-service';
import { CourseService } from '../../main-services/course-service';
import { of } from 'rxjs';
import { COURSE, STATUS } from '../../models/course.model';
import { DecimalPipe } from '@angular/common';

describe('AllCourse', () => {
  let component: AllCourses;
  let fixture: ComponentFixture<AllCourses>;
  let courseService: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {
    const courseSpy = jasmine.createSpyObj(
      'CourseService',
      ['getCourses']
    );

    await TestBed.configureTestingModule({
      imports: [AllCourses],
      providers: [
        provideRouter([]),
        MainStateService,
        { provide: CourseService, useValue: courseSpy }
      ]
    })
      .compileComponents();

    courseService = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
  });

  it('should create component', () => {
    courseService.getCourses.and.returnValue(of([]));
    fixture = TestBed.createComponent(AllCourses);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should load courses', () => {
    const mockCourses: COURSE[] = [
      {
        id: 1,
        name: 'Angular',
        description: 'Angular Kurs',
        price: '99.99',
        image: null,
        order: '1',
        badge: null,
        status: STATUS.PUBLISHED, // oder ein anderer gültiger STATUS
        features: []
      },
      {
        id: 2,
        name: 'Java',
        description: 'Java Kurs',
        price: '89.99',
        image: null,
        order: '2',
        badge: null,
        status: STATUS.PUBLISHED,
        features: []
      }
    ];

    courseService.getCourses.and.returnValue(of(mockCourses));
    fixture = TestBed.createComponent(AllCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.courses()).toEqual(mockCourses);
  });
});
