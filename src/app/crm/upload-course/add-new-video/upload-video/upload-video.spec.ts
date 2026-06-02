import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVideo } from './upload-video';
import { provideRouter } from '@angular/router';

describe('UploadVideo', () => {
  let component: UploadVideo;
  let fixture: ComponentFixture<UploadVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadVideo],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
