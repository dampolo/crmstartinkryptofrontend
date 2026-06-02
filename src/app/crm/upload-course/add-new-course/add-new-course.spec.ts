import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCourse } from './add-new-course';
import { provideRouter } from '@angular/router';

describe('AddNewCourse', () => {
  let component: AddNewCourse;
  let fixture: ComponentFixture<AddNewCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewCourse],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
