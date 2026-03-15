import { Component, inject, signal } from '@angular/core';
import { MainStateService } from '../../../main-services/main-state-service';
import { environment } from '../../../../environment/environment';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PURCHASE_CUSTOMER } from '../../../models/purchase.model';
import { PurchaseService } from '../../../main-services/purchase-service';
import { PaymentCategoryLabel, PaymentMethodLabel, PaymentStatusLabels } from '../../../models/invoice.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-purchases',
    imports: [DatePipe, DecimalPipe],
    templateUrl: './my-purchases.html',
    styleUrl: './my-purchases.scss',
})
export class MyPurchases {
    purchaseService = inject(PurchaseService);
    mainStateService = inject(MainStateService);
    baseUrl = environment.apiBaseUrl;
    purchases = signal<PURCHASE_CUSTOMER[]>([]);
    PaymentMethodLabel = PaymentMethodLabel;
    PaymentCategoryLabel = PaymentCategoryLabel;
    PaymentStatusLabels = PaymentStatusLabels

    constructor(private router: Router) { }


    ngOnInit(): void {
        this.purchaseService.getCustomerPurchases().subscribe({
            next: (invoices) => {
                this.purchases.set(invoices);
                console.log(invoices);

            },
            error: (err) => {
                this.mainStateService.displayToast('SystemFehler', false);
            },
        });
    }

    buyCourse(courseId: string, discount: string) {
         const payload = {
                    course_id: courseId,
                    discount: discount
                }

        this.router.navigate(
            [`customer/courses/payment/${courseId}/paypal`],
            {
                state: { payload: payload }
            }
        )
    }

}
