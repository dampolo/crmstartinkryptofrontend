import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCustomer } from './login-customer';
import { provideRouter, Router } from '@angular/router';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { of, throwError } from 'rxjs';

describe('Login', () => {
  let component: LoginCustomer;
  let fixture: ComponentFixture<LoginCustomer>;

  let mainStateService: MainStateService;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {

    const authSpy = jasmine.createSpyObj(
      'AuthService',
      ['loginAndFetchUser', 'loginWithGoogle']
    );

    const routerSpy = jasmine.createSpyObj('Router', [
      'navigate'
    ]);

    await TestBed.configureTestingModule({
      imports: [LoginCustomer],
      providers: [
        provideRouter([]),
        MainStateService,
        { provide: AuthService, useValue: authSpy }
      ]

    })
      .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    mainStateService = TestBed.inject(MainStateService);
    spyOn(mainStateService, 'displayToast');

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(LoginCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error toast when form is invalid', () => {

    component.loginForm.setValue({
      userEmail: '',
      password: ''
    });

    component.loginWithEmailAndPassword();

    expect(mainStateService.displayToast)
      .toHaveBeenCalledWith(
        'Bitte alle Felder ausfüllen',
        false
      );

    expect(authService.loginAndFetchUser)
      .not.toHaveBeenCalled();
  });

  it('should navigate to dashboard after successful login', () => {

    authService.loginAndFetchUser.and.returnValue(
      of(true)
    );

    component.loginForm.setValue({
      userEmail: 'test@test.de',
      password: 'Password123!'
    });

    component.loginWithEmailAndPassword();

    expect(authService.loginAndFetchUser)
      .toHaveBeenCalledWith(
        'test@test.de',
        'Password123!'
      );

    expect(mainStateService.displayToast)
      .toHaveBeenCalledWith(
        'Du bist angemeldet.',
        true
      );

    expect(router.navigate)
      .toHaveBeenCalledWith(
        ['/customer/dashboard'],
        { replaceUrl: false }
      );
  });

  it('should show error toast when login fails', () => {

    authService.loginAndFetchUser.and.returnValue(
      throwError(() => new Error())
    );

    component.loginForm.setValue({
      userEmail: 'test@test.de',
      password: 'Password123!'
    });

    component.loginWithEmailAndPassword();

    expect(mainStateService.displayToast)
      .toHaveBeenCalledWith(
        'Login fehlgeschlagen - prüfe deine Daten.',
        false
      );
  });

  it('should hide preloader after successful login', () => {
    authService.loginAndFetchUser.and.returnValue(
      of(true)
    );

    component.loginForm.setValue({
      userEmail: 'test@test.de',
      password: 'Password123!'
    });

    component.loginWithEmailAndPassword();

    expect(mainStateService.showPreloader)
      .toBeFalse();
  });

  it('should toggle password visibility', () => {
    component.isPasswordVisible = true;

    component.togglePasswordVisibility();

    expect(component.isPasswordVisible).toBeFalse();

    component.togglePasswordVisibility();

    expect(component.isPasswordVisible).toBeTrue();
  });

  it('should login with Google, navigate to customer dashboard, hide preloader', async () => {
    authService.loginWithGoogle.and.resolveTo();

    await component.createOrLoginWithGoogle();

    expect(authService.loginWithGoogle).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([
      '/customer/dashboard'
    ]);
    expect(mainStateService.showPreloader).toBeFalse();
  });

  it('should hide preloader when Google login fails', async () => {
    authService.loginWithGoogle.and.rejectWith(
      new Error('Google login failed')
    );

    await component.createOrLoginWithGoogle();

    expect(authService.loginWithGoogle).toHaveBeenCalled();

    expect(router.navigate).not.toHaveBeenCalled();
    
    expect(mainStateService.showPreloader).toBeFalse();

  });

});
