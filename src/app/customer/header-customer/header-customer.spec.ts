import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCustomer } from './header-customer';
import { Router } from '@angular/router';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { of } from 'rxjs';
import { ToastService } from '../../main-services/toast-service';

describe('HeaderCustomer', () => {
  let component: HeaderCustomer;
  let fixture: ComponentFixture<HeaderCustomer>;

  let mainStateServiceMock: jasmine.SpyObj<MainStateService>
  let authServiceMock: jasmine.SpyObj<AuthService>
  let toastServiceMock: jasmine.SpyObj<ToastService>

  let router: Router


  beforeEach(async () => {

    mainStateServiceMock = {
      showConfirmationText: {
        set: jasmine.createSpy('set')
      }
    } as any;

    toastServiceMock = jasmine.createSpyObj('ToastService', ['displayToast']);

    const isMenuOpenSignal = jasmine.createSpy('isMenuOpen') as any;
    isMenuOpenSignal.set = jasmine.createSpy('set');
    isMenuOpenSignal.update = jasmine.createSpy('update');
    mainStateServiceMock.isMenuOpen = isMenuOpenSignal;

    authServiceMock = jasmine.createSpyObj(
      'AuthService',
      ['logout']
    );

    await TestBed.configureTestingModule({
      imports: [HeaderCustomer],
      providers: [
        {
          provide: MainStateService,
          useValue: mainStateServiceMock
        },
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: ToastService,
          useValue: toastServiceMock
        }
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(HeaderCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('it should call logout navigate to login and display toast', () => {

    component.logOut()

    expect(authServiceMock.logout)
      .toHaveBeenCalled();

    expect(router.navigate)
      .toHaveBeenCalledWith(
        ['/kurse/login']
      )

    expect(toastServiceMock.displayToast)
      .toHaveBeenCalledWith('Du bist erfolgreich abgemeldet', true)
  })

  it('should show dialog', () => {
    component.showDialog();

    expect(mainStateServiceMock.isProfileVisible).toBeTrue()
  });

  it('should close dialog', () => {
    component.closeDialog();

    expect(mainStateServiceMock.isProfileVisible).toBeFalse()
  });

  it('should toggle menu', () => {
    component.openMenu();

    expect(mainStateServiceMock.isMenuOpen.update)
      .toHaveBeenCalled();
  });

  it('it should close menu', () => {
    component.closeMenu();
    expect(mainStateServiceMock.isMenuOpen.set).toHaveBeenCalledWith(false)
  })

});
