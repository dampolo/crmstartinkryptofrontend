import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPdf } from './upload-pdf';
import { provideRouter } from '@angular/router';

describe('UploadPdf', () => {
  let component: UploadPdf;
  let fixture: ComponentFixture<UploadPdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadPdf],providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPdf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
