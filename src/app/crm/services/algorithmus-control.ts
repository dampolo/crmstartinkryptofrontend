import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ServiceCatalog } from '../../models/service-catalog.model';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmusControl {
  private baseUrl = environment.apiBaseUrl;

  serivce = signal<ServiceCatalog | null>(null);

  constructor(private http: HttpClient) {}

  updateServices(services: any[]) {
    return this.http.put(`${this.baseUrl}service-catalog/bulk_update/`, services, {
      withCredentials: true,
    });
  }

  deleteService(id: number) {
    return this.http.delete(`${this.baseUrl}service-catalog/${id}/`, {
      withCredentials: true,
    });
  }

  getServiceCatalog(): Observable<ServiceCatalog[]> {
    return this.http.get<ServiceCatalog[]>(`${this.baseUrl}service-catalog/`, {
      withCredentials: true,
    });
  }
}
