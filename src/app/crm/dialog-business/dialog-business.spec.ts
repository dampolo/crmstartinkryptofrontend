import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogBusiness } from './dialog-business';


describe('Profile', () => {
  let component: DialogBusiness;
  let fixture: ComponentFixture<DialogBusiness>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBusiness]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBusiness);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
