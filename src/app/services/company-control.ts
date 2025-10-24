import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyControl {

  companyName = "Start in Krypto";
  street = "Chiemgaustrasse";
  number = "156";
  postcode = "81549";
  city = "München";
  ownerName = "Elisabeth Poloczek";
  taxNumber = "DE455357286";
  founding = "2025";
  email = "elisabeth@startinkrypto.de"
}
