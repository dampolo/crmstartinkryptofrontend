import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLessons } from './list-of-lessons';

describe('ListOfLessons', () => {
  let component: ListOfLessons;
  let fixture: ComponentFixture<ListOfLessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfLessons]
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
