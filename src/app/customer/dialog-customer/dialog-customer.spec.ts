import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogCustomer } from './dialog-customer';
import { MainStateService } from '../../main-services/main-state-service';
import { ToastService } from '../../main-services/toast-service';
import { AuthService } from '../../main-services/auth-service';
import { Router } from '@angular/router';


describe('Profile', () => {
    let component: DialogCustomer;
    let fixture: ComponentFixture<DialogCustomer>;

    let mainStateService: MainStateService;
    let toastService: ToastService;
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
            imports: [DialogCustomer],
            providers: [
                MainStateService,
                { provide: Router, useValue: routerSpy },
                { provide: AuthService, useValue: authSpy }
            ]
        })
            .compileComponents();

        toastService = TestBed.inject(ToastService);
        spyOn(toastService, 'displayToast');

        mainStateService = TestBed.inject(MainStateService);

        authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

        router = TestBed.inject(Router) as jasmine.SpyObj<Router>



        fixture = TestBed.createComponent(DialogCustomer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component dialog customer', () => {
        expect(component).toBeTruthy();
    });

    it('should logout user and navigate to login page', () => {
        component.logOut();

        expect(authService.logout).toHaveBeenCalled();

        expect(router.navigate).toHaveBeenCalledWith([
            '/kurse/login'
        ]);

        expect(mainStateService.isProfileVisible).toBeFalse();

        expect(toastService.displayToast).toHaveBeenCalledWith(
            'Du bist erfolgreich abgemeldet',
            true
        );

    })
    it('should navigate to profile customer page', () => {
        component.openProfile();
        expect(router.navigate).toHaveBeenCalledWith(
            ['/customer/profile']
        )
    })

});
