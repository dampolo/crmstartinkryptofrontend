import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewLesson } from './add-new-lesson';
import { provideRouter } from '@angular/router';


describe('AddNewLesson', () => {
  let component: AddNewLesson;
  let fixture: ComponentFixture<AddNewLesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewLesson],
      providers: [
        provideRouter([])
      ]
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
