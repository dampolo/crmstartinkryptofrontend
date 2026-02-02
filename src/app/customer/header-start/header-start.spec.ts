import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStart } from './header-start';

describe('HeaderStart', () => {
  let component: HeaderStart;
  let fixture: ComponentFixture<HeaderStart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderStart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderStart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
