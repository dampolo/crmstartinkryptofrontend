import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeatures } from './edit-features';

describe('EditFeatures', () => {
  let component: EditFeatures;
  let fixture: ComponentFixture<EditFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFeatures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFeatures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
