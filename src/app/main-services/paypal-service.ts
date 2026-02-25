import { Injectable } from '@angular/core';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {

  async loadPayPal(): Promise<PayPalNamespace | null> {

    return await loadScript({

      clientId: environment.paypalClientId,

      currency: 'EUR'

    });

  }
}
