import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCourse } from './upload-course';

describe('UploadCourse', () => {
  let component: UploadCourse;
  let fixture: ComponentFixture<UploadCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
