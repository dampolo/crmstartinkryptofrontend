import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogBusiness } from './dialog-business';
import { MainStateService } from '../../main-services/main-state-service';
import { Router } from '@angular/router';
import { AuthService } from '../../main-services/auth-service';


describe('Profile', () => {
  let component: DialogBusiness;
  let fixture: ComponentFixture<DialogBusiness>;

  let mainStateService: MainStateService;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj(
      'AuthService',
      ['logout']
    );

    const routerSpy = jasmine.createSpyObj('Router', [
      'navigate'
    ]);


    await TestBed.configureTestingModule({
      imports: [DialogBusiness],
      providers: [
        MainStateService,
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authSpy }
      ]
    })
      .compileComponents();

    mainStateService = TestBed.inject(MainStateService);
    spyOn(mainStateService, 'displayToast');

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>

    fixture = TestBed.createComponent(DialogBusiness);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should logout user and navigate to login page', () => {
    component.logOut();

    expect(authService.logout).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalledWith([
      '/kurse/login'
    ]);

    expect(mainStateService.isLoginPage)
      .toBeTrue();

    expect(mainStateService.isProfileVisible)
      .toBeFalse();

    expect(mainStateService.displayToast)
      .toHaveBeenCalledWith(
        'Du bist erfolgreich abgemeldet',
        true
      );
  });

  it('should navigate to profile page', () => {
    component.openProfile();

    expect(router.navigate).toHaveBeenCalledWith([
      '/crm/profile'
    ]);
  });

});
