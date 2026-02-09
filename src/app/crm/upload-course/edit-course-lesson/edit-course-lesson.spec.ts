import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseLesson } from './edit-course-lesson';

describe('EditCourseLesson', () => {
  let component: EditCourseLesson;
  let fixture: ComponentFixture<EditCourseLesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCourseLesson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourseLesson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
