import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { COMPANY } from '../models/company.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyControl {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  company = signal<COMPANY | null>(null);

  updateCompany(data: Partial<COMPANY>) {
    return this.http.patch(this.baseUrl + 'company', data, {
      withCredentials: true,
    });
  }

  getCompany():Observable<COMPANY> {
     return this.http.get<COMPANY>(this.baseUrl + 'company', { 
      withCredentials: true 
    }).pipe(
      tap(res => this.company.set(res))
    )
  }
}
