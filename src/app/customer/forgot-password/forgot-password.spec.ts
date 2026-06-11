import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassword } from './forgot-password';
import { provideRouter, Route, Router } from '@angular/router';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { of, throwError } from 'rxjs';
import { ToastService } from '../../main-services/toast-service';

describe('ForgotPassword', () => {
    let component: ForgotPassword;
    let fixture: ComponentFixture<ForgotPassword>;

    let mainStateServiceMock: jasmine.SpyObj<MainStateService>
    let toastServiceMock: jasmine.SpyObj<ToastService>

    let authServiceMock: jasmine.SpyObj<AuthService>
    let router: Router

    beforeEach(async () => {

        toastServiceMock = jasmine.createSpyObj('ToastService', [
            'displayToast'
        ]);

        mainStateServiceMock = {
            showConfirmationText: {
                set: jasmine.createSpy('set')
            }
        } as any;
        
        authServiceMock = jasmine.createSpyObj(
            'AuthService',
            ['forgotPassword']
        );

        await TestBed.configureTestingModule({
            imports: [ForgotPassword],
            providers: [
                provideRouter([]),
                {
                    provide: MainStateService,
                    useValue: mainStateServiceMock
                },
                {
                    provide: ToastService,
                    useValue: toastServiceMock
                },
                {
                    provide: AuthService,
                    useValue: authServiceMock
                }
            ]
        })
            .compileComponents();

        router = TestBed.inject(Router);
        spyOn(router, 'navigate');

        fixture = TestBed.createComponent(ForgotPassword);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should clear confirmation text before submitting', () => {
        authServiceMock.forgotPassword.and.returnValue(of(true));
        component.recoveryForm.setValue({
            email: 'test@test.de'
        });

        component.submit();

        expect(mainStateServiceMock.showConfirmationText.set)
            .toHaveBeenCalledWith('');
    })

    it('should navigate to confirmation page and show text with confirmation', () => {
        authServiceMock.forgotPassword.and.returnValue(of(true))

        component.recoveryForm.setValue({
            email: 'test@test.de'
        })

        component.submit()

        expect(authServiceMock.forgotPassword)
            .toHaveBeenCalledTimes(1);

        expect(authServiceMock.forgotPassword)
            .toHaveBeenCalledWith('test@test.de');

        expect(mainStateServiceMock.showConfirmationText.set)
            .toHaveBeenCalledWith('Du kannst jetzt dein E-Mail prüfen.')

        expect(router.navigate)
            .toHaveBeenCalledWith(
                ['/kurse/confirmation']
            )
    });

    it('should handle error and display toast', () => {
        authServiceMock.forgotPassword.and.returnValue(
            throwError(() => new Error('Try again'))
        );

        component.recoveryForm.setValue({
            email: 'test@test.de'
        });

        component.submit()

        expect(authServiceMock.forgotPassword)
            .toHaveBeenCalledTimes(1);

        expect(authServiceMock.forgotPassword)
            .toHaveBeenCalledWith('test@test.de');

        expect(toastServiceMock.displayToast)
            .toHaveBeenCalledWith('Versuche noch einmal', false)

    })
});
