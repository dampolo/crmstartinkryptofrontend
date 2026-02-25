import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PaypalService } from '../../../../main-services/paypal-service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-paypal',
    imports: [],
    templateUrl: './paypal.html',
    styleUrl: './paypal.scss',
})
export class Paypal {

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

        await paypal.Buttons!({
            createOrder: () => {
                return fetch('http://localhost:8000/api/paypal/create-order/', {
                    method: 'POST'
                })
                    .then(res => res.json())
                    .then(order => order.id);
            },
            onApprove: (data) => {
                return fetch(
                    `http://localhost:8000/api/paypal/capture-order/${data.orderID}/`,
                    { method: 'POST' }
                )
                    .then(res => res.json())
                    .then(details => {
                        console.log("Payment successful:", details);
                        alert("Payment completed!");
                    });
            }
        }).render(this.paypalElement.nativeElement);
    }

}
  
