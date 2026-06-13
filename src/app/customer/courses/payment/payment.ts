import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, computed, ErrorHandler, inject, signal } from '@angular/core';
import { MainStateService } from '../../../main-services/main-state-service';
import { CourseService } from '../../../main-services/course-service';
import { ActivatedRoute, Router } from '@angular/router';
import { COURSE, DISCOUNT_CODE, TAX } from '../../../models/course.model';
import { InvoiceService } from '../../../main-services/invoice-service';
import { AuthService } from '../../../main-services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { PROFILE_INCOMPLETE_ERROR } from '../../../models/customer.model';
import { PurchaseService } from '../../../main-services/purchase-service';
import { ToastService } from '../../../main-services/toast-service';
import { Back } from '../../../shared/back/back';

@Component({
    selector: 'app-payment',
    imports: [CommonModule, DecimalPipe, Back],
    templateUrl: './payment.html',
    styleUrl: './payment.scss',
})
export class Payment {
    mainStateService = inject(MainStateService)
    toastService = inject(ToastService);
    courseService = inject(CourseService)
    invoiceService = inject(InvoiceService)
    authService = inject(AuthService);
    purchaseService = inject(PurchaseService)
    discountCode = signal<DISCOUNT_CODE | null>(null)
    tax = signal<TAX | null>(null)
    discountCodeConfirmed: boolean = true
    showConfirmation: boolean = false
    course = signal<COURSE | null>(null);
    paymentMethod = signal<string>('paypal');

    constructor(private route: ActivatedRoute, private router: Router) { }

    setPaymentMethod(method: string) {
        this.paymentMethod.set(method);
    }

    ngOnInit(): void {
        const courseId = Number(this.route.snapshot.paramMap.get('courseId'))
        // Load of Course object
        this.courseService.getCourse(courseId).subscribe({
            next: (data) => {
                this.course.set(data)
                console.log(data);
            },
            error: (err) => {
                this.toastService.displayToast('Systemfehler', false)
            }
        })

        // Load of tax object
        this.invoiceService.getTax().subscribe({
            next: (response) => {
                this.tax.set(response)
            },
            error: (err) => {
                this.toastService.displayToast('Systemfehler', false)
            }
        })
    }
    

    // The method check if the discount code correct ist
    // and give you the object back.
    checkDiscountCode(code: string) {
        this.showConfirmation = true;
        this.courseService.DiscountCode(code).subscribe({
            next: (response) => {
                this.discountCodeConfirmed = true;
                this.discountCode.set(response);
            },
            error: (error) => {
                this.discountCodeConfirmed = false;
                this.discountCode.set(null);

                const message =
                    error?.error?.message ||
                    'Du hast diesen Kurs bereits gekauft';

                this.toastService.displayToast(
                    message,
                    false
                );
            }
        })
    }

    netPrice = computed(() => Number(this.course()?.price) || 0);

    discountPercent = computed(() =>
        this.discountCode()?.percent_value ?? 0
    );

    taxPercent = computed(() => Number(this.tax()?.percent) || 0);

    discountAmount = computed(() =>
        Number(
            (this.netPrice() * (this.discountPercent() / 100)).toFixed(2)
        )
    );

    discountedNetPrice = computed(() =>
        Number(
            (this.netPrice() - this.discountAmount()).toFixed(2)
        )
    );


    // Tax price without disocunt 
    taxAmount = computed(() =>
        Number(
            (this.netPrice() * (this.taxPercent() / 100)).toFixed(2)
        )
    );

    // Tax price with discount
    taxAmountWithDiscount = computed(() =>
        Number(
            (this.discountedNetPrice() * (this.taxPercent() / 100)).toFixed(2)
        )
    );

    // gross price without discount
    grossPrice = computed(() =>
        Number(
            (this.netPrice() + this.taxAmount()).toFixed(2)
        )
    );

    // gross price with discount
    grossPriceWithDiscount = computed(() =>
        Number(
            (this.discountedNetPrice() + this.taxAmountWithDiscount()).toFixed(2)
        )
    );

    checkoutPayload = computed(() => ({
        course_id: this.course()?.id,
        discount: this.discountCode()?.id ?? null
    }))

    submitOrder() {
        const payload = this.checkoutPayload()
        const courseId = Number(this.route.snapshot.paramMap.get('courseId'))
        this.checkProfileComplete(courseId, payload, this.paymentMethod())
    }

    // Check if the profile is complieted because you cannot buy a course if
    // the address is not complite
    checkProfileComplete(courseId: number, payload: any, paymentMethod: string) {
        this.authService.checkProfileComplete().subscribe({
            next: () => {
                this.checkPurchase(courseId, payload, paymentMethod)
            },
            error: (error: HttpErrorResponse) => {
                const err = error.error as PROFILE_INCOMPLETE_ERROR;
                const message = err?.message || 'Kauf fehlgeschlagen';
                this.toastService.displayToast(message, false);

            }
        });

    }

    checkPurchase(courseId: number, payload: any, paymentMethod: string) {

        this.purchaseService.checkPurchase(courseId).subscribe({

            next: () => {

                // Navigate ONLY if purchase check succeeds
                if (paymentMethod === 'paypal') {
                    this.router.navigate(
                        [`customer/courses/payment/${courseId}/paypal`],
                        {
                            state: { payload: payload }
                        }
                    );
                } else {
                    this.buyCourseWithBankTransfer(payload)
                }
            },

            error: (error: HttpErrorResponse) => {

                const message =
                    error?.error?.message ||
                    'Du hast diesen Kurs bereits gekauft';

                this.toastService.displayToast(
                    message,
                    false
                );
            }
        });
    }

    buyCourseWithBankTransfer(payload: any) {
        this.courseService.buyCourse(payload).subscribe({
            next: () => {
                this.mainStateService.showConfirmationText.set('Du hast den Kurs erfoglreich gekauft.')
                this.mainStateService.showConfirmationLink.set('course');
                this.router.navigate(['/customer/confirmation']);
            },
            error: (error) => {
                const message = error.error.message || 'Kauf fehlgeschlagen';
                this.toastService.displayToast(message, false);
            }
        })
    }

}



