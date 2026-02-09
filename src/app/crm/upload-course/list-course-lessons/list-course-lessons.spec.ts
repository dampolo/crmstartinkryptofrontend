import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourseLessons } from './list-course-lessons';

describe('ListCourseLessons', () => {
  let component: ListCourseLessons;
  let fixture: ComponentFixture<ListCourseLessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCourseLessons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCourseLessons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
