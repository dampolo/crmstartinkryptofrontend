import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PaypalService } from '../../../../main-services/paypal-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-paypal',
    imports: [],
    templateUrl: './paypal.html',
    styleUrl: './paypal.scss',
})
export class Paypal {
    private baseUrl = environment.apiBaseUrl;

    paypalService = inject(PaypalService)

    @ViewChild('paypalButton', { static: true }) paypalElement!: ElementRef<HTMLElement>;

    constructor(
        private http: HttpClient
    ) { }

    async ngOnInit() {
        const paypal = await this.paypalService.loadPayPal();

        if (!paypal) {
            console.error("PayPal SDK could not be loaded.");
            return;
        }

        paypal.Buttons!({

            createOrder: async () => {
                const response: any = await firstValueFrom(
                    this.http.post(
                        `${this.baseUrl}paypal/create-order/`,
                        {amount: 15},
                        { withCredentials: true }
                    )
                );
                console.log("orderID from PAYPAL: ", response.orderID);
                
                return response.orderID;
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

