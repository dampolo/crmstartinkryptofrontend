import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideo } from './edit-video';

describe('EditVideo', () => {
  let component: EditVideo;
  let fixture: ComponentFixture<EditVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
