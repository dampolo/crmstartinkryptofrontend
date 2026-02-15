import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MainStateService } from '../../../main-services/main-state-service';
import { CourseService } from '../../../main-services/course-service';
import { single } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
    constructor(private route: ActivatedRoute) { }

    paymentMethod(method: string) {
        console.log(method);

        this.selectedPayment = method;
    }

    ngOnInit(): void {
        const courseId = Number(this.route.snapshot.paramMap.get('courseId'))
        // Load of Course object
        this.courseService.getCourse(courseId).subscribe({
            next: (data) => {
                this.course.set(data)
                console.log(typeof data);
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

    calculateTax() {
        const netPrice = Number(this.course()?.price) || 0;
        const taxPercent = Number(this.tax()?.percent) || 0;
        const taxPrice = (netPrice * (1 + taxPercent / 100)) - netPrice;
        return +Number(taxPrice.toFixed(2))
    }

    calculatePrice() {
        const netPrice = Number(this.course()?.price) || 0;
        const taxPercent = Number(this.tax()?.percent) || 0;
        const discountPercent = this.discountCode()?.percent_value ?? 0;

        // Rabatt anwenden (wenn keiner da ist → 0%)
        const discountedPrice = netPrice * (1 - discountPercent / 100);

        // MwSt hinzufügen
        const grossPrice = discountedPrice * (1 + taxPercent / 100);

        return Number(grossPrice.toFixed(2));
    }
}
