import { Injectable, signal } from '@angular/core';
import { ServiceCatalog } from '../models/service-catalog.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmusControl {
  private baseUrl = environment.apiBaseUrl;

  basicFeeProvision: number = 700
  firstStepProvision: number = 0.05;
  exchangeSetupProvision: number = 0.03;
  buyStrategyProvision: number = 0.7;
  walletSetupProvision: number = 0.06;
  taxToolProvision: number = 0.06;
  ongoingSupportProvision: number = 400;
  valueAddedTax: number = 19

  serivce = signal<ServiceCatalog | null>(null);

   constructor(private http: HttpClient) {}

  updateServices(services: any[]) {
    return this.http.post(this.baseUrl + 'service-catalog/', services, {
      withCredentials: true,
    });
  }
  
  getServiceCatalog(): Observable<ServiceCatalog[] > {
    return this.http.get<ServiceCatalog[]>(`${this.baseUrl}service-catalog/`, {
      withCredentials: true,
    });
  }
}
