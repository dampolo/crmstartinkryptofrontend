import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Main } from './main';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';

describe('Main', () => {
  let component: Main;
  let fixture: ComponentFixture<Main>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Main, TranslateModule.forRoot()],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Main);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
