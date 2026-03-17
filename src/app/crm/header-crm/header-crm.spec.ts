import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCrm } from './header-crm';

describe('Header', () => {
  let component: HeaderCrm;
  let fixture: ComponentFixture<HeaderCrm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCrm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCrm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
