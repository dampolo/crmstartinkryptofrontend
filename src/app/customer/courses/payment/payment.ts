import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MainStateService } from '../../../main-services/main-state-service';
import { CourseService } from '../../../main-services/course-service';
import { single } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { COURSE, DISCOUNT_CODE, TAX } from '../../../models/course.model';
import { InvoiceService } from '../../../main-services/invoice-service';

@Component({
    selector: 'app-payment',
    imports: [CommonModule, DecimalPipe],
    templateUrl: './payment.html',
    styleUrl: './payment.scss',
})
export class Payment {
    selectedPayment: string = "paypal";
    mainStateService = inject(MainStateService)
    courseService = inject(CourseService)
    invoiceService = inject(InvoiceService)
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
                this.mainStateService.displayToast('Systemfehler', false)
            }
        })

        // Load of tax object
        this.invoiceService.getTax().subscribe({
            next: (response) => {
                this.tax.set(response)
            },
            error: (err) => {
                this.mainStateService.displayToast('Systemfehler', false)
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
        if (this.paymentMethod() === 'bank') {
            this.courseService.buyCourse(payload).subscribe({
                next: () => {
                    this.mainStateService.displayToast('Der Kurs wurde gekauft', true);
                },
                error: (err) => {
                    console.log(err);

                    const message = err?.error?.message || 'Kauf fehlgeschlagen';

                    this.mainStateService.displayToast(message, false);

                }
            })
        } else {
            const courseId = Number(this.route.snapshot.paramMap.get('courseId'))
            this.router.navigate([
                `customer/courses/payment/${courseId}/paypal`])
        }
    }
}
