import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAccount } from './create-account';
import { provideRouter, Router } from '@angular/router';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { FormControl, FormGroup } from '@angular/forms';


describe('CreateAccount', () => {
  let component: CreateAccount;
  let fixture: ComponentFixture<CreateAccount>;

  let mainStateService: MainStateService;
  let authSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', [
      'createUser'
    ]);

    await TestBed.configureTestingModule({
      imports: [CreateAccount],
      providers: [
        provideRouter([]),
        MainStateService,
        {
          provide: AuthService,
          useValue: authSpy
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router)
    spyOn(router, "navigate")

    mainStateService = TestBed.inject(MainStateService);
    spyOn(mainStateService, 'displayToast');

    fixture = TestBed.createComponent(CreateAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call createUser when form is invalid', () => {
    component.myForm.patchValue({
      email: '',
      password1: '',
      password2: ''
    });

    component.submit();

    expect(component.isFormSubmitted).toBeTrue();
    expect(authSpy.createUser).not.toHaveBeenCalled();
  });

  it('should call createUser when form is valid', () => {
    authSpy.createUser.and.returnValue(
      of({} as User)
    );

    component.myForm.patchValue({
      email: 'test@test.de',
      password1: 'Test123!',
      password2: 'Test123!',
      term: true
    });

    expect(component.myForm.valid).toBeTrue();

    component.submit();

    expect(authSpy.createUser).toHaveBeenCalled();
  });

  it('should call createUser with correct values', () => {
    authSpy.createUser.and.returnValue(
      of({} as User)
    );

    component.myForm.patchValue({
      email: 'test@test.de',
      password1: 'Test123!',
      password2: 'Test123!',
      term: true
    });

    component.submit();

    expect(authSpy.createUser).toHaveBeenCalledWith(
      'test@test.de',
      'Test123!',
      'Test123!',
      'customer'
    );
  });

  it('should navigate to confirmation page after successful registration', () => {
    authSpy.createUser.and.returnValue(
      of({} as User)
    );

    component.myForm.patchValue({
      email: 'test@test.de',
      password1: 'Test123!',
      password2: 'Test123!',
      term: true
    });

    component.submit();

    expect(router.navigate).toHaveBeenCalledWith([
      '/kurse/confirmation'
    ]);
  });

  it('should set confirmation text after successful registration', () => {
    authSpy.createUser.and.returnValue(
      of({} as User)
    );

    component.myForm.patchValue({
      email: 'test@test.de',
      password1: 'Test123!',
      password2: 'Test123!',
      term: true
    });

    component.submit();

    expect(mainStateService.showConfirmationText()).toBe(
      'Du bist erfolgreich registriert. Um dich anzumelden, musst du dein E-Mail bestätigen!'
    );
  });

  it('should set confirmation link after successful registration', () => {
    authSpy.createUser.and.returnValue(
      of({} as User)
    );

    component.myForm.patchValue({
      email: 'test@test.de',
      password1: 'Test123!',
      password2: 'Test123!',
      term: true
    });

    component.submit();

    expect(mainStateService.showConfirmationLink())
      .toBe('login');
  });

  it('should hide preloader after successful registration', () => {
    authSpy.createUser.and.returnValue(
      of({} as User)
    );

    component.myForm.patchValue({
      email: 'test@test.de',
      password1: 'Test123!',
      password2: 'Test123!',
      term: true
    });

    component.submit();

    expect(mainStateService.showPreloader)
      .toBeFalse();
  });

  it('should show error toast when registration fails', () => {
    authSpy.createUser.and.returnValue(
      throwError(() => new Error('User already exists'))
    );

    component.myForm.patchValue({
      email: 'test@test.de',
      password1: 'Test123!',
      password2: 'Test123!',
      term: true
    });

    component.submit();

    expect(mainStateService.displayToast)
      .toHaveBeenCalledWith(
        'Du bist schon registriert.',
        false
      );
  });

  it('should set error message when registration fails', () => {
    authSpy.createUser.and.returnValue(
      throwError(() => new Error())
    );

    component.myForm.patchValue({
      email: 'test@test.de',
      password1: 'Test123!',
      password2: 'Test123!',
      term: true
    });

    component.submit();

    expect(component.errorResponse()).toBe(
      'Du bist schon registriert mit E-Mail oder Google.'
    );
  });

  it('should hide preloader when registration fails', () => {
    authSpy.createUser.and.returnValue(
      throwError(() => new Error())
    );

    component.myForm.patchValue({
      email: 'test@test.de',
      password1: 'Test123!',
      password2: 'Test123!',
      term: true
    });

    component.submit();

    expect(mainStateService.showPreloader)
      .toBeFalse();
  });

  it('should return null when passwords match', () => {
    const form = new FormGroup({
      password1: new FormControl('Test123!'),
      password2: new FormControl('Test123!')
    });

    const result = component.passwordMatchValidator(form);

    expect(result).toBeNull();
  });

  it('should return passwordMismatch when passwords do not match', () => {
    const form = new FormGroup({
      password1: new FormControl('Test123!'),
      password2: new FormControl('Test456!')
    });

    const result = component.passwordMatchValidator(form);

    expect(result).toEqual({
      passwordMismatch: true
    });
  });

  it('should toggle password visibility Top', () => {
    component.isPasswordTopVisible = false;

    component.togglePasswordVisibilityTop();

    expect(component.isPasswordTopVisible).toBeTrue();

    component.togglePasswordVisibilityTop();

    expect(component.isPasswordTopVisible).toBeFalse();
  });

  it('should toggle password visibility Bottom', () => {
    component.isPasswordBottomVisible = false;

    component.togglePasswordVisibilityBottom();

    expect(component.isPasswordBottomVisible).toBeTrue();

    component.togglePasswordVisibilityBottom();

    expect(component.isPasswordBottomVisible).toBeFalse();
  });
});
