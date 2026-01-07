import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Invoice, InvoiceCreate } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getInvoices():Observable<Invoice[]>{
    return this.http.get<Invoice[]>(`${this.baseUrl}invoices/`,{
      withCredentials: true
    })
  }

  createInvoice(invoice: InvoiceCreate): Observable<InvoiceCreate> {
    return this.http.post<InvoiceCreate>(`${this.baseUrl}invoices/`, invoice, {
      withCredentials: true,
    });
  }
}
