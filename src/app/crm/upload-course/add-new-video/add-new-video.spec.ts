import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVideo } from './add-new-video';

describe('AddNewVideo', () => {
  let component: AddNewVideo;
  let fixture: ComponentFixture<AddNewVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
