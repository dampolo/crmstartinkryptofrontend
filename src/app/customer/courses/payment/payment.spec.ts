import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payment } from './payment';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { COURSE, DISCOUNT_CODE, STATUS, TAX } from '../../../models/course.model';
import { AuthService } from '../../../main-services/auth-service';
import { of, throwError } from 'rxjs';
import { ToastService } from '../../../main-services/toast-service';
import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseService } from '../../../main-services/purchase-service';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { InvoiceService } from '../../../main-services/invoice-service';

describe('Payment', () => {
    let component: Payment;
    let fixture: ComponentFixture<Payment>;
    let authServiceSpy: jasmine.SpyObj<AuthService>
    let purchaseServiceSpy: jasmine.SpyObj<PurchaseService>
    let courseServiceSpy: jasmine.SpyObj<CourseService>
    let mainStateService: MainStateService;
    let invoiceServiceSpy: jasmine.SpyObj<InvoiceService>
    let toastServiceSpy: jasmine.SpyObj<ToastService>;
    let router: Router;


    const mockCourse: COURSE = {
        id: 1,
        name: 'Angular',
        description: 'Angular course description',
        price: '199.99',
        image: null,
        order: '1',
        badge: null,
        status: STATUS.PUBLISHED,
        features: []
    };

    const mockDiscountCode: DISCOUNT_CODE = {
        id: 1,
        code: 'SAVE10',
        percent_value: 10
    };

    const mockTax: TAX = {
        name: 'VAT',
        percent: '19',
        active: true
    };

    beforeEach(async () => {

        authServiceSpy = jasmine.createSpyObj(
            'AuthService',
            ['checkProfileComplete', 'checkAuth']
        );

        toastServiceSpy = jasmine.createSpyObj('ToastService', [
            'displayToast'
        ]);

        purchaseServiceSpy = jasmine.createSpyObj('PurchaseService',
            ['checkPurchase']
        )
        courseServiceSpy = jasmine.createSpyObj('CourseService',
            ['buyCourse', 'getCourse']
        )

        invoiceServiceSpy = jasmine.createSpyObj(
            'InvoiceService',
            ['getTax']
        );

        await TestBed.configureTestingModule({
            imports: [Payment],
            providers: [
                MainStateService,
                provideRouter([]),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({
                                courseId: '1'
                            })
                        }
                    }
                },
                {
                    provide: AuthService,
                    useValue: authServiceSpy
                },
                {
                    provide: ToastService,
                    useValue: toastServiceSpy
                }
                ,
                {
                    provide: PurchaseService,
                    useValue: purchaseServiceSpy
                },
                {
                    provide: CourseService,
                    useValue: courseServiceSpy
                },
                {
                    provide: InvoiceService,
                    useValue: invoiceServiceSpy
                }
            ]
        })
            .compileComponents();

        router = TestBed.inject(Router);
        spyOn(router, 'navigate');

        mainStateService = TestBed.inject(MainStateService);

        courseServiceSpy.getCourse.and.returnValue(of(mockCourse));
        invoiceServiceSpy.getTax.and.returnValue(of(mockTax));

        fixture = TestBed.createComponent(Payment);
        component = fixture.componentInstance;

        component.course.set(mockCourse);

        fixture.detectChanges();

    });

    it('should create payment component', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate netPrice from course price', () => {
        expect(component.netPrice()).toBe(199.99);
    });

    it('should return 0 when course is null', () => {
        component.course.set(null);

        expect(component.netPrice()).toBe(0);
    });

    it('should return 0 for invalid price', () => {
        component.course.set({
            ...mockCourse,
            price: 'abc'
        });

        expect(component.netPrice()).toBe(0);
    });

    it('should calculate all prices correctly', () => {
        component.course.set(mockCourse);
        component.discountCode.set(mockDiscountCode);
        component.tax.set(mockTax);

        expect(component.netPrice()).toBe(199.99);

        expect(component.discountAmount()).toBe(20);
        expect(component.discountedNetPrice()).toBe(179.99);

        expect(component.taxAmount()).toBe(38);
        expect(component.taxAmountWithDiscount()).toBe(34.2);

        expect(component.grossPrice()).toBe(237.99);
        expect(component.grossPriceWithDiscount()).toBe(214.19);
    });

    it('should return 0 discount when no discount code exists', () => {
        component.discountCode.set(null);

        expect(component.discountPercent()).toBe(0);
        expect(component.discountAmount()).toBe(0);
    });

    it('should return 0 tax when no tax exists', () => {
        component.tax.set(null);

        expect(component.taxPercent()).toBe(0);
        expect(component.taxAmount()).toBe(0);
    });

    it('should return 0 tax for invalid tax percentage', () => {
        component.tax.set({
            percent: 'abc'
        } as any);

        expect(component.taxPercent()).toBe(0);
    });

    it('should return 0 discount when no discount code exists', () => {
        component.course.set(mockCourse);
        component.discountCode.set(null);

        expect(component.discountPercent()).toBe(0);
        expect(component.discountAmount()).toBe(0);
    });

    it('should return 0 tax when no tax exists', () => {
        component.course.set(mockCourse);
        component.tax.set(null);

        expect(component.taxPercent()).toBe(0);
        expect(component.taxAmount()).toBe(0);
    });

    it('should return 0 tax when tax percent is invalid', () => {
        component.course.set(mockCourse);

        component.tax.set({
            name: 'VAT',
            percent: 'abc',
            active: true
        });

        expect(component.taxPercent()).toBe(0);
        expect(component.taxAmount()).toBe(0);
    });

    it('should calculate 100% discount correctly', () => {
        component.course.set(mockCourse);

        component.discountCode.set({
            id: 1,
            code: 'FREE',
            percent_value: 100
        });

        component.tax.set(mockTax);

        expect(component.discountedNetPrice()).toBe(0);
        expect(component.grossPriceWithDiscount()).toBe(0);
    });
    it('should create checkout payload with course id and discount id', () => {
        component.course.set(mockCourse);
        component.discountCode.set(mockDiscountCode);

        expect(component.checkoutPayload()).toEqual({
            course_id: 1,
            discount: 1
        });
    });
    it('should create checkout payload with null discount when no discount code', () => {
        component.course.set(mockCourse);
        component.discountCode.set(null);

        expect(component.checkoutPayload()).toEqual({
            course_id: 1,
            discount: null
        });
    });
    it('should create checkout payload with undefined course_id when no course', () => {
        component.course.set(null);
        component.discountCode.set(mockDiscountCode);

        expect(component.checkoutPayload()).toEqual({
            course_id: undefined,
            discount: 1
        });
    });

    it('should call checkProfileComplete in submitOrder with correct values', () => {
        component.course.set(mockCourse);

        component.discountCode.set({
            id: 1,
            code: 'SAVE10',
            percent_value: 10
        });

        component.paymentMethod.set('paypal');

        spyOn(component, 'validateProfileBeforePurchase');

        component.submitOrder();

        expect(component.validateProfileBeforePurchase).toHaveBeenCalledWith(
            1, // courseId from route
            {
                course_id: 1,
                discount: 1
            },
            'paypal'
        );
    });

    it('should call checkPurchase in (checkProfileComplete) when profile is complete', () => {
        authServiceSpy.checkProfileComplete.and.returnValue(
            of({
                message: 'Profil vollständig'
            })
        );
        spyOn(component, 'validatePurchase');

        const payload = {
            course_id: 1,
            discount: null
        };

        component.validateProfileBeforePurchase(1, payload, 'paypal');

        expect(component.validatePurchase).toHaveBeenCalledWith(
            1,
            payload,
            'paypal'
        );
    });

    it('should show backend error message when profile is incomplete', () => {
        const errorResponse = new HttpErrorResponse({
            error: {
                message: 'Ergänze dein Profil',
                missing_fields: ['first_name']
            }
        });

        authServiceSpy.checkProfileComplete.and.returnValue(
            throwError(() => errorResponse)
        );

        component.validateProfileBeforePurchase(
            1,
            { course_id: 1, discount: null },
            'paypal'
        );

        expect(toastServiceSpy.displayToast).toHaveBeenCalledWith(
            'Ergänze dein Profil',
            false
        );
    });

    it('should navigate to paypal page when purchase check succeeds', () => {
        purchaseServiceSpy.checkPurchase.and.returnValue(of(true))

        const payload = {
            course_id: 1,
            discount: null
        };

        component.validatePurchase(1, payload, 'paypal')

        expect(router.navigate).toHaveBeenCalledWith(
            ['customer/courses/payment/1/paypal'],
            {
                state: { payload }
            }
        )
    })

    it('should navigate to paypal page when purchase check succeeds', () => {
        purchaseServiceSpy.checkPurchase.and.returnValue(of(true))

        const payload = {
            course_id: 1,
            discount: null
        };

        component.validatePurchase(1, payload, 'paypal')

        expect(router.navigate).toHaveBeenCalledWith(
            ['customer/courses/payment/1/paypal'],
            {
                state: { payload }
            }
        )
    })

    it('should call buyCourseWithBankTransfer when payment method is bank transfer', () => {
        purchaseServiceSpy.checkPurchase.and.returnValue(of(true));

        spyOn(component, 'buyCourseWithBankTransfer');

        const payload = {
            course_id: 1,
            discount: null
        };

        component.validatePurchase(1, payload, 'bank')

        expect(component.buyCourseWithBankTransfer)
            .toHaveBeenCalledWith(payload)
    })

    it('should show error toast when course is already purchased', () => {
        purchaseServiceSpy.checkPurchase.and.returnValue(
            throwError(() =>
                new HttpErrorResponse({
                    error: {
                        message: 'Du hast diesen Kurs bereits gekauft'
                    }
                })
            )
        );

        component.validatePurchase(
            1,
            { course_id: 1, discount: null },
            'paypal'
        );

        expect(toastServiceSpy.displayToast).toHaveBeenCalledWith(
            'Du hast diesen Kurs bereits gekauft',
            false
        );
    });

    it('should show fallback message when backend error has no message', () => {
        purchaseServiceSpy.checkPurchase.and.returnValue(
            throwError(() =>
                new HttpErrorResponse({
                    error: {}
                })
            )
        );

        component.validatePurchase(
            1,
            { course_id: 1, discount: null },
            'paypal'
        );

        expect(toastServiceSpy.displayToast).toHaveBeenCalledWith(
            'Du hast diesen Kurs bereits gekauft',
            false
        );
    });

    it('should navigate to confirmation page when course purchase succeeds', () => {
        const payload = {
            course_id: 1,
            discount: null
        };

        courseServiceSpy.buyCourse.and.returnValue(of({}));

        component.buyCourseWithBankTransfer(payload);

        expect(mainStateService.showConfirmationText()).toBe(
            'Du hast den Kurs erfoglreich gekauft.'
        );

        expect(mainStateService.showConfirmationLink()).toBe(
            'course'
        );

        expect(router.navigate).toHaveBeenCalledWith([
            '/customer/confirmation'
        ]);
    });

    it('should call buyCourse service with payload', () => {
        const payload = {
            course_id: 1,
            discount: null
        };

        courseServiceSpy.buyCourse.and.returnValue(of({}));

        component.buyCourseWithBankTransfer(payload);

        expect(courseServiceSpy.buyCourse)
            .toHaveBeenCalledWith(payload);
    });

    it('should show error message when purchase fails', () => {
        const payload = {
            course_id: 1,
            discount: null
        };

        courseServiceSpy.buyCourse.and.returnValue(
            throwError(() => ({
                error: {
                    message: 'Kurs bereits gekauft'
                }
            }))
        );

        component.buyCourseWithBankTransfer(payload);

        expect(toastServiceSpy.displayToast)
            .toHaveBeenCalledWith(
                'Kurs bereits gekauft',
                false
            );
    });

    it('should show fallback message when backend error has no message', () => {
        const payload = {
            course_id: 1,
            discount: null
        };

        courseServiceSpy.buyCourse.and.returnValue(
            throwError(() => ({
                error: {}
            }))
        );

        component.buyCourseWithBankTransfer(payload);

        expect(toastServiceSpy.displayToast)
            .toHaveBeenCalledWith(
                'Kauf fehlgeschlagen',
                false
            );
    });
});
