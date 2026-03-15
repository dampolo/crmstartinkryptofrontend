import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PaypalService } from '../../../../main-services/paypal-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MainStateService } from '../../../../main-services/main-state-service';

@Component({
    selector: 'app-paypal',
    imports: [],
    templateUrl: './paypal.html',
    styleUrl: './paypal.scss',
})
export class Paypal {
    private baseUrl = environment.apiBaseUrl;
    mainStateService = inject(MainStateService)
    paypalService = inject(PaypalService)

    @ViewChild('paypalButton', { static: true }) paypalElement!: ElementRef<HTMLElement>;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    async ngOnInit() {
        const paypal = await this.paypalService.loadPayPal();
        const payload = history.state?.payload;
        console.log(payload);

        if (!paypal) {
            console.error("PayPal SDK could not be loaded.");
            return;
        }

        paypal.Buttons!({

            createOrder: async () => {
                try {
                    const response: any = await firstValueFrom(
                        this.http.post(
                            `${this.baseUrl}paypal/create-order/`,
                            payload,
                            { withCredentials: true }
                        )
                    );

                    return response.orderID;
                } catch (error: any) {


                    const message =
                        error?.error?.message ||
                        error?.error?.detail ||
                        "Something went wrong";

                    this.mainStateService.displayToast(message, false);

                    throw error; // optional but recommended
                }
            },

            onApprove: async (data: any) => {
                const response: any = await firstValueFrom(
                    this.http.post(
                        `${this.baseUrl}paypal/capture-order/`,
                        { orderID: data.orderID },
                        { withCredentials: true }
                    )
                );

                console.log("Payment completed:", response);
            }

        }).render(this.paypalElement.nativeElement);
    }

}

