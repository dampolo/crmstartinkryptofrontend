import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWebsite } from './layout-website';

describe('LayoutWebsite', () => {
  let component: LayoutWebsite;
  let fixture: ComponentFixture<LayoutWebsite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutWebsite]
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
