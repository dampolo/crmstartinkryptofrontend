import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourses } from './my-courses';
import { provideRouter, Router } from '@angular/router';

describe('MyCourses', () => {
  let component: MyCourses;
  let fixture: ComponentFixture<MyCourses>;

  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCourses],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(MyCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create my courses', () => {
    expect(component).toBeTruthy();
  });

  it('Should navigate to my list of lessons', () => {
    component.openCourse(1)

    expect(router.navigate).toHaveBeenCalledWith(
      ['customer/my-courses/1/list-of-lessons']
    )
  })
});
