import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyControl {
  private apiUrl = "https://demo.startinkrypto.de/api/company/";
  private http = inject(HttpClient);

  companyLogo = "./assets/SK-logo.svg";
  companyName = "Start in Krypto";
  street = "Chiemgaustrasse";
  number = "156";
  postcode = "81549";
  city = "München";
  ownerName = "Elisabeth Poloczek";
  taxNumber = "DE455357286";
  founding = "2025";
  email = "elisabeth@startinkrypto.de"
  bank = "N26";
  bankAccount = "DE13 1001 1001 2429 1491 43";
  swiftCode = "NTSBDEB1XXX";


}
