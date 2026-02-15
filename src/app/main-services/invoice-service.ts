import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TAX } from '../models/course.model';

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
  
}
