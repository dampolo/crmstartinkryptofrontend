import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourseLessons } from './list-course-lessons';
import { provideRouter } from '@angular/router';

describe('ListCourseLessons', () => {
  let component: ListCourseLessons;
  let fixture: ComponentFixture<ListCourseLessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCourseLessons],
      providers: [
        provideRouter([])
      ]
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
