import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { DASHBOARD } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getDashboard(): Observable<DASHBOARD> {
    return this.http.get<DASHBOARD>(`${this.baseUrl}dashboard/`, {
      withCredentials: true
    })
  }
}
