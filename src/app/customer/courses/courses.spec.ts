import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Courses } from './courses';
import { Router } from '@angular/router';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { ToastService } from '../../main-services/toast-service';
import { of } from 'rxjs';

describe('Courses', () => {
    let component: Courses;
    let fixture: ComponentFixture<Courses>;

    let authServiceSpy: jasmine.SpyObj<AuthService>
    let toastServiceSpy: jasmine.SpyObj<ToastService>

    let router: Router

    beforeEach(async () => {

        authServiceSpy = jasmine.createSpyObj(
            'AuthService',
            ['checkAuth']
        );

        toastServiceSpy = jasmine.createSpyObj('ToastService', ['displayToast']);

        await TestBed.configureTestingModule({
            imports: [Courses],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceSpy
                },
                {
                    provide: ToastService,
                    useValue: toastServiceSpy
                }
            ]
        })
            .compileComponents();

        router = TestBed.inject(Router);
        spyOn(router, 'navigate');

        fixture = TestBed.createComponent(Courses);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component courses', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to payment page when user is logged in', () => {
        authServiceSpy.checkAuth.and.returnValue(of(true))

        component.buyCourse(123);
        expect(router.navigate).toHaveBeenCalledWith([
            'customer/courses/payment', 123
        ])

    })

    it('should navigate to information page when user is not logged in', () => {
        authServiceSpy.checkAuth.and.returnValue(of(false))

        component.buyCourse(123);
        expect(router.navigate).toHaveBeenCalledWith([
            'kurse/information'
        ])

    })
});
