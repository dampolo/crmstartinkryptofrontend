import { Injectable, signal } from '@angular/core';
import { Service } from '../models/service.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

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

  serivce = signal<Service | null>(null);

   constructor(private http: HttpClient) {}

  updateServices(services: any[]) {
    return this.http.post(this.baseUrl + 'service-catalog/', services, {
      withCredentials: true,
    });
  }
  
}
