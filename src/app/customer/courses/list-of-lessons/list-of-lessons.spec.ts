import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLessons } from './list-of-lessons';
import { provideRouter } from '@angular/router';

describe('ListOfLessons', () => {
  let component: ListOfLessons;
  let fixture: ComponentFixture<ListOfLessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfLessons],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfLessons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
