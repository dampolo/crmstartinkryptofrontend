import { Component, ElementRef, ViewChild } from '@angular/core';
import { PaypalService } from '../../../../main-services/paypal-service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-paypal',
    imports: [],
    templateUrl: './paypal.html',
    styleUrl: './paypal.scss',
})
export class Paypal {
     @ViewChild('paypalButton', { static: true }) paypalElement!: ElementRef;

  constructor(
    private paypalService: PaypalService,
    private http: HttpClient
  ) {}

  

}
