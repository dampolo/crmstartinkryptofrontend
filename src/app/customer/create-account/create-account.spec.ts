import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAccount } from './create-account';
import { provideRouter } from '@angular/router';


describe('CreateAccount', () => {
  let component: CreateAccount;
  let fixture: ComponentFixture<CreateAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccount],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
