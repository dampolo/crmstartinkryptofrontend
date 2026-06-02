import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWebsite } from './layout-website';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('LayoutWebsite', () => {
  let component: LayoutWebsite;
  let fixture: ComponentFixture<LayoutWebsite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutWebsite, TranslateModule.forRoot()],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutWebsite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
