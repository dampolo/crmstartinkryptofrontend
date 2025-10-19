import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Algorithmus } from './algorithmus';

describe('Algorithmus', () => {
  let component: Algorithmus;
  let fixture: ComponentFixture<Algorithmus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Algorithmus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Algorithmus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
