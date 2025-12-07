import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyInfo } from '../models/company-info.model';
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

  company = signal<CompanyInfo | null>(null);

  updateCompany(data: Partial<CompanyInfo>) {
    return this.http.patch(this.apiUrl, data, {
      withCredentials: true,
    });
  }

  getCompany() {
    this.http.get<CompanyInfo>(this.apiUrl, { withCredentials: true }).subscribe({
      next: (res) => {
        this.company.set(res);
      },
    });
  }
}
