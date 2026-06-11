import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastService } from '../../main-services/toast-service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  let mainStateService: MainStateService;
  let toastService: ToastService;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj(
      'AuthService',
      ['loginAndFetchUser']
    );

    const routerSpy = jasmine.createSpyObj('Router', [
      'navigate'
    ]);

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        MainStateService,
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    toastService = TestBed.inject(ToastService);
    spyOn(toastService, 'displayToast');

    mainStateService = TestBed.inject(MainStateService);

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to dashboard after successful login', () => {
    authService.loginAndFetchUser.and.returnValue(of(true));

    component.loginForm.setValue({
      email: 'test@test.de',
      password: '123456'
    });

    component.onSubmit();

    expect(authService.loginAndFetchUser)
      .toHaveBeenCalledWith('test@test.de', '123456');

    expect(toastService.displayToast)
      .toHaveBeenCalledWith('Du bist angemeldet', true);

    expect(router.navigate)
      .toHaveBeenCalledWith(
        ['crm/dashboard'],
        { replaceUrl: true }
      );
  });

  it('should toggle password visibility', () => {
    component.isPasswordVisible = true;

    component.togglePasswordVisibility();

    expect(component.isPasswordVisible).toBeFalse();

    component.togglePasswordVisibility();

    expect(component.isPasswordVisible).toBeTrue();
  });
});
