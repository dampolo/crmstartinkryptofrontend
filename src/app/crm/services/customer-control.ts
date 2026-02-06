import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { CUSTOMER, CUSTOMER_CRM } from '../../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerControl {
  private baseUrl = environment.apiBaseUrl;

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

  constructor(private http: HttpClient) {}

  // Fetch ALL customers
  getCustomers():Observable<CUSTOMER_CRM[]> {
    return this.http.get<CUSTOMER_CRM[]>(this.baseUrl + 'customers/', {
      withCredentials: true
    })
  } 

  getCustomerById(id: number): Observable<CUSTOMER> {
    return this.http.get<CUSTOMER>(
      `${this.baseUrl}customers/${id}`,
      {withCredentials: true}
    )
  }

  postCustomerById(payload: CUSTOMER): Observable<CUSTOMER> {
    return this.http.post<CUSTOMER>(
      `${this.baseUrl}customers/`,
      payload,
      {withCredentials: true}
    )
  }

  updateCustomerById(id: number, payload: CUSTOMER): Observable<CUSTOMER> {
    return this.http.patch<CUSTOMER>(
      `${this.baseUrl}customers/${id}/`,
      payload,
      {withCredentials: true}
    )
  }
}
