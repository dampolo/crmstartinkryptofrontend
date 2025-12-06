import { Injectable, signal } from '@angular/core';
import { CUSTOMER } from '../models/customer.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerControl {
  generateCustomerNumber() {
    const prefix = 'SK';
    let counter = 1;
    counter += 1;
    const paddedCounter = counter.toString().padStart(6, '0');
    return prefix + paddedCounter;
  }

  generateCustomerInvoiceNumber() {
    const prefix = '#';
    let counter = 1;
    counter += 1;
    const paddedCounter = counter.toString().padStart(6, '0');
    return prefix + paddedCounter;
  }

  customers = signal<CUSTOMER[]>([]);   // <-- SIGNAL

  constructor(private http: HttpClient, private config: ConfigService) {}

  // Dynamically build endpoint from config.json
  private get apiUrl() {
    return this.config.apiUrl + 'customers/';
  }

  // Fetch ALL customers
  getCustomers() {
    this.http.get<CUSTOMER[]>(this.apiUrl, { withCredentials: true }).subscribe({
      next: (res) => {
        this.customers.set(res);
      },
    });
  }

}
