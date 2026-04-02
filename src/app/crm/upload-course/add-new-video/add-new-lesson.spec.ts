import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewLesson } from './add-new-lesson';


describe('AddNewVideo', () => {
  let component: AddNewLesson;
  let fixture: ComponentFixture<AddNewLesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewLesson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewLesson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
