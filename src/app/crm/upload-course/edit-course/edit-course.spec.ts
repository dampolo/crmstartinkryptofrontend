import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCourse } from './edit-course';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';


describe('EditCourse', () => {
  let component: EditCourse;
  let fixture: ComponentFixture<EditCourse>;

  const courseServiceMock = {
    getCourse: jasmine.createSpy().and.returnValue(
      of({
        name: 'Angular',
        order: 1,
        badge: 'NEW',
        description: 'Test description',
        price: 99
      })
    ),
    updateCourse: jasmine.createSpy()
  };

  const mainStateServiceMock = {
    displayToast: jasmine.createSpy()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCourse],
      providers: [
        provideRouter([]),

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },

        {
          provide: CourseService,
          useValue: courseServiceMock
        },

        {
          provide: MainStateService,
          useValue: mainStateServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});