import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payment } from './payment';
import { provideRouter } from '@angular/router';
import { COURSE, DISCOUNT_CODE, STATUS, TAX } from '../../../models/course.model';

describe('Payment', () => {
    let component: Payment;
    let fixture: ComponentFixture<Payment>;

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
        await TestBed.configureTestingModule({
            imports: [Payment],
            providers: [
                provideRouter([])
            ]
        })
            .compileComponents();

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

});
