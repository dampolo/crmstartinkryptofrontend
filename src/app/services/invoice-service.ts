import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { InvoiceCreate } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
    private baseUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) {}

  createInvoice(invoice: InvoiceCreate): Observable<InvoiceCreate> {
    return this.http.post<InvoiceCreate>(
      `${this.baseUrl}invoices`,
      invoice
    )
  } 
}
