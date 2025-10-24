import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmusControl {

  basicFeeProvision: number = 700
  firstStepProvision: number = 0.05;
  exchangeSetupProvision: number = 0.03;
  buyStrategyProvision: number = 5;
  walletSetupProvision: number = 0.06;
  taxToolProvision: number = 0.06;
  ongoingSupportProvision: number = 400;
  
}
