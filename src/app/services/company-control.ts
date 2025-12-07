import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { COMPANY } from '../models/company.model';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyControl {

  constructor(private http: HttpClient, private config: ConfigService) {}

  // Dynamically build endpoint from config.json
  private get apiUrl() {
    return this.config.apiUrl + 'company/';
  }

  company = signal<COMPANY | null>(null);

  updateCompany(data: Partial<COMPANY>) {
    return this.http.patch(this.apiUrl, data, {
      withCredentials: true,
    });
  }

  getCompany() {
    this.http.get<COMPANY>(this.apiUrl, { withCredentials: true }).subscribe({
      next: (res) => {
        this.company.set(res);
      },
    });
  }
}
