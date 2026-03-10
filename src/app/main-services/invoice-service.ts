import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TAX } from '../models/course.model';
import { environment } from '../../environment/environment';
import { INVOICE } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getTax(): Observable<TAX> {
    return this.http.get<TAX>(`${this.baseUrl}tax/`, {
      withCredentials: true
    })
  }

  getCustomerInvoices(): Observable<INVOICE[]> {
    return this.http.get<INVOICE[]>(`${this.baseUrl}my-invoices/`, {
      withCredentials: true
    })
  }

}
