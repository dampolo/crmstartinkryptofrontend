import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PURCHASE_CUSTOMER } from '../models/purchase.model';

@Injectable({
    providedIn: 'root',
})
export class PurchaseService {
    private baseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getCustomerPurchases(): Observable<PURCHASE_CUSTOMER[]> {
        return this.http.get<PURCHASE_CUSTOMER[]>(`${this.baseUrl}my-purchases/`, {
          withCredentials: true
        })
      }
}
